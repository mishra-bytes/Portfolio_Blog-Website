---
title: "Designing Reliable Vision Systems for Measurement Tasks"
excerpt: "A placeholder post showing how local markdown articles render inside the portfolio, including code blocks, lists, and tables."
date: "2026-03-07"
readTime: "4 min read"
tags:
  - Computer Vision
  - MLOps
  - Markdown
---

# Why measurement-focused vision is different

When a vision model is connected to a physical process, accuracy is only one part of the problem. Calibration, latency, failure modes, and sensor alignment matter just as much as the model itself.

## A practical loop

1. Acquire stable frames from the camera or device.
2. Run preprocessing tuned to the measurement surface.
3. Infer the structured target such as digits, keypoints, or boundaries.
4. Validate the result against domain constraints before publishing data.

## Example preprocessing snippet

```python
def preprocess(frame):
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    blur = cv2.GaussianBlur(gray, (5, 5), 0)
    return cv2.adaptiveThreshold(
        blur,
        255,
        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv2.THRESH_BINARY,
        11,
        2,
    )
```

## Typical checks

| Check | Why it matters |
| --- | --- |
| Confidence thresholds | Prevent unstable predictions from being logged |
| Temporal smoothing | Reduces flicker in video-based measurements |
| Sensor sanity bounds | Rejects impossible outputs before downstream actions |

> Reliable deployment usually comes from conservative validation, not just a stronger model.

Adding a new article only requires another markdown file in `content/posts`.
