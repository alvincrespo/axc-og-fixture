---
layout: post
title: "Debugging the \"connection refused\" Error in Docker"
category: tooling
date: 2026-07-02T09:15:00.000Z
description: "Why a container cannot reach localhost, and what to use instead."
---

Inside a container, localhost is the container itself. Use the service name or the host gateway to reach other things.
