---
id: 1ef40c6e-2391-69f0-95c4-9d0c25401eb5
title: 系统配置
alias: doc-template-guide-config
cover:
created_time: 2024-07-13 11:20:41
updated_time: 2024-07-13 11:20:41
categories:
tags:
excerpt:
published: true
---

## 系统配置

系统配置位于用户根目录`config.yml`

### 获取方式

- 在模版中可以通过全局变量获取

`{{ sysConfig.key }}`

- 通过 `SysConfigItem` 模版标签获取

  - path: 变量路径

```
 {%  SysConfigItem path="key" %}
```
