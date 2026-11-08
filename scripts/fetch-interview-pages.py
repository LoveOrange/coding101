#!/usr/bin/env python3
"""Cache public Nowcoder post bodies for manual review; never classify or infer hits.

Only the selected post is retained, excluding comments, recommendations and private
SSR fields. Cache files stay under ignored output/ and must not be committed.
"""

import argparse
import datetime
import hashlib
import html.parser
import json
import pathlib
import re
import time
import urllib.parse
import urllib.request

EXTRACTOR_VERSION = 2


class PostText(html.parser.HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.parts = []
        self.images = []
        self.ignored = 0

    def handle_starttag(self, tag, attrs):
        if tag in {"script", "style"}:
            self.ignored += 1
        if tag in {"p", "div", "li", "br", "h1", "h2", "h3", "pre", "tr"}:
            self.parts.append("\n")
        if tag == "img":
            attrs = dict(attrs)
            src = attrs.get("src") or attrs.get("data-src")
            if src:
                self.images.append({"url": src, "alt": attrs.get("alt", "")})

    def handle_endtag(self, tag):
        if tag in {"script", "style"}:
            self.ignored = max(0, self.ignored - 1)
        if tag in {"p", "div", "li", "h1", "h2", "h3", "pre", "tr"}:
            self.parts.append("\n")

    def handle_data(self, data):
        if not self.ignored:
            self.parts.append(data)


def find_post(value, post_id):
    if isinstance(value, dict):
        if str(value.get("id")) == post_id and "content" in value and "title" in value:
            return value
        for child in value.values():
            found = find_post(child, post_id)
            if found is not None:
                return found
    elif isinstance(value, list):
        for child in value:
            found = find_post(child, post_id)
            if found is not None:
                return found
    return None


def read_state(page):
    marker = re.search(r"window\.__INITIAL_STATE__\s*=\s*", page)
    if marker is None:
        raise ValueError("No readable public post state; use web/browser review or mark unreadable")
    state, _ = json.JSONDecoder().raw_decode(page[marker.end():])
    return state


def extract_post(page, url, post_id):
    state = read_state(page)
    post = find_post(state, post_id)
    if post is None:
        raise ValueError("Requested post not found; do not substitute recommendations")
    parser = PostText()
    parser.feed(post.get("content") or "")
    # Feed posts can keep their gallery outside the content HTML. Only inspect
    # the selected post's observed public field, never images from other posts.
    attachments = post.get("imgMoment") or []
    if not isinstance(attachments, list):
        raise ValueError("Unrecognized imgMoment; review attachments before caching")
    attachment_images = []
    for position, attachment in enumerate(attachments):
        if not isinstance(attachment, dict) or not attachment.get("src"):
            raise ValueError(f"Unrecognized imgMoment item {position}; review attachments")
        attachment_images.append({
            "url": attachment["src"], "alt": attachment.get("alt", ""),
            "width": attachment.get("width"), "height": attachment.get("height"),
            "source": "imgMoment", "position": position,
        })
    images = parser.images + attachment_images
    body = "\n".join(line.strip() for line in "".join(parser.parts).splitlines() if line.strip())
    if not body and not images:
        raise ValueError("Empty post body")
    public_user = post.get("userBrief") or {}
    return {
        "url": url,
        "extractorVersion": EXTRACTOR_VERSION,
        "publicPostId": str(post["id"]),
        "publicPostUuid": post.get("uuid"),
        "title": post["title"],
        "publicAuthorId": str(public_user.get("userId") or post.get("authorId") or ""),
        "displayTimeMillis": post.get("showTime"),
        "createdTimeMillis": post.get("createTime") or post.get("createdAt"),
        "retrievedAt": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        "body": body,
        "bodySha256": hashlib.sha256(body.encode()).hexdigest(),
        "bodyHashMethod": "sha256 of UTF-8 normalized body; fetch-interview-pages.py",
        "images": images,
        "inlineImages": parser.images,
        "attachmentImages": attachment_images,
        "attachmentFieldPresent": "imgMoment" in post,
        "reviewStatus": "unreviewed",
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("urls", nargs="*")
    parser.add_argument("--url-file", type=pathlib.Path, help="One URL per line")
    parser.add_argument("--output-dir", type=pathlib.Path, default=pathlib.Path("output/campus-expansion/pages"))
    parser.add_argument("--refresh", action="store_true")
    args = parser.parse_args()
    urls = args.urls + (args.url_file.read_text().splitlines() if args.url_file else [])
    args.output_dir.mkdir(parents=True, exist_ok=True)
    for raw_url in dict.fromkeys(url.strip() for url in urls if url.strip()):
        try:
            parsed = urllib.parse.urlparse(raw_url)
            if parsed.hostname not in {"www.nowcoder.com", "nowcoder.com"}:
                raise ValueError("Only public Nowcoder posts are supported")
            match = re.fullmatch(r"/(?:discuss/(\d+)|feed/main/detail/([a-f0-9]+))/?", parsed.path)
            if not match:
                raise ValueError("Unsupported post path")
            post_id = match[1] or match[2]
            canonical = "https://www.nowcoder.com" + parsed.path.rstrip("/")
            output = args.output_dir / f"{post_id}.json"
            if output.exists() and not args.refresh:
                old = json.loads(output.read_text())
                if old.get("extractorVersion") == EXTRACTOR_VERSION:
                    print(json.dumps({"url": canonical, "cache": str(output), "status": "cached"}))
                    continue
                print(json.dumps({"url": canonical, "cache": str(output), "status": "refreshing-old-extractor"}), flush=True)
            request = urllib.request.Request(canonical, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(request, timeout=30) as response:
                page = response.read().decode("utf-8")
            # Feed URLs use a UUID while the SSR post has a numeric id.
            if match[2]:
                state = read_state(page)
                def feed_id(value):
                    if isinstance(value, dict):
                        if value.get("uuid") == post_id and "title" in value and "content" in value:
                            return str(value["id"])
                        return next((found for child in value.values() if (found := feed_id(child))), None)
                    if isinstance(value, list):
                        return next((found for child in value if (found := feed_id(child))), None)
                    return None
                post_id = feed_id(state)
                if not post_id:
                    raise ValueError("Requested feed post not found")
            result = extract_post(page, canonical, post_id)
            output.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n")
            print(json.dumps({"url": canonical, "cache": str(output), "status": "fetched", "characters": len(result["body"]), "images": len(result["images"])}))
        except Exception as error:
            print(json.dumps({"url": raw_url, "status": "failed", "reason": str(error)}, ensure_ascii=False))
        time.sleep(0.3)


if __name__ == "__main__":
    main()
