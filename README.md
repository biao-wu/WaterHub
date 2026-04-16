# WaterHub - 灌区水务中心

基于 Django + React 的灌区水务信息管理平台，用于灌区水务数据的实时监控、展示与信息发布。项目采用前后端不分离架构，包含**前端官网大屏展示**和**后台发布管理平台**两大模块。

## 项目架构

```
WaterHub/
├── water_py/              # 后端 - Django 项目（含官网大屏模板）
│   ├── Water_demo/        # Django 项目配置
│   │   ├── settings.py    # 项目配置（数据库、中间件、静态文件等）
│   │   ├── urls.py        # 根路由
│   │   └── wsgi.py        # WSGI 入口
│   ├── api/               # 核心业务应用
│   │   ├── models.py      # 数据模型
│   │   ├── urls.py        # API 路由
│   │   ├── views/         # 视图模块
│   │   │   ├── accounts.py    # 用户认证（注册/登录/信息修改）
│   │   │   ├── water.py       # 水务数据展示（大屏/折线图/地图）
│   │   │   ├── dev.py         # 设备管理（增删改查）
│   │   │   ├── share.py       # 信息分享（内容发布/查询）
│   │   │   ├── logs.py        # 登录日志
│   │   │   └── admin_logs.py  # 操作日志
│   │   ├── utils/         # 工具模块
│   │   │   ├── jwt_auth.py    # JWT Token 生成
│   │   │   ├── pager.py       # 分页工具
│   │   │   └── get_name.py    # 用户名解析
│   │   └── extensions/
│   │       └── auth.py        # JWT 认证中间件
│   ├── static/            # 静态资源（CSS/JS/图片）
│   └── uwsgi.ini          # uWSGI 部署配置
│
└── water_react/           # 前端 - React 管理后台（SPA）
    ├── src/
    │   ├── App.js             # 主布局（Admin 侧边栏 + 路由）
    │   ├── route/index.js     # 路由配置（懒加载）
    │   ├── api/               # Axios 请求封装
    │   │   ├── request.js     # Axios 实例（含 JWT 拦截器）
    │   │   └── index.js       # API 接口
    │   ├── component/         # 页面组件
    │   │   ├── login/         # 登录
    │   │   ├── admin/         # 管理后台布局
    │   │   ├── Water/         # 水质数据
    │   │   ├── Map/           # 地图展示
    │   │   ├── Dev/           # 设备管理
    │   │   ├── ListDev/       # 设备列表
    │   │   ├── AddDev/        # 新增设备
    │   │   ├── UpdataDev/     # 修改设备
    │   │   ├── DltDev/        # 删除设备
    │   │   ├── Share/         # 信息分享
    │   │   ├── AddShare/      # 发布信息
    │   │   ├── SearchShare/   # 搜索信息
    │   │   ├── PersonInfo/    # 个人信息
    │   │   ├── UpUserInfo/    # 修改信息
    │   │   ├── UpUserPwd/     # 修改密码
    │   │   ├── AddAdmin/      # 添加管理员（root 权限）
    │   │   ├── loginLogs/     # 登录日志
    │   │   ├── OpaMyLogs/     # 个人操作日志
    │   │   ├── OpaAllLogs/    # 全部操作日志
    │   │   └── notfound/      # 404 页面
    │   └── store/              # Redux 状态管理
    └── config-overrides.js    # CRA 配置覆盖（antd 按需加载）
```

## 功能模块

### 1. 官网大屏展示（water_py 模板渲染）

- **水务数据大屏**：实时展示各站点 PH 值、浑浊度、余氯等水质合格率
- **站点状态统计**：正常/离线/异常站点数量统计
- **ECharts 折线图**：多站点水质数据趋势对比（PH、浑浊度、溶解氧、电导率、余氯）
- **地图展示**：站点地理位置及实时数据标注

### 2. 后台管理平台（water_react SPA）

- **用户认证**：注册 / 登录（JWT Token 鉴权）
- **个人信息**：查看/修改个人信息、修改密码
- **设备管理**：设备增删改查、设备列表分页、设备位置地图
- **信息发布**：发布/搜索灌区动态信息（支持图片上传）
- **日志管理**：登录日志、个人操作日志、全部操作日志
- **权限管理**：root 用户可添加管理员、删除设备

## 技术栈

### 后端

| 技术 | 版本 | 说明 |
|------|------|------|
| Python | - | 开发语言 |
| Django | 2.2.28 | Web 框架 |
| Django REST Framework | 3.11.0 | RESTful API |
| djangorestframework-jwt | 1.11.0 | JWT 认证 |
| PyMySQL | 0.9.3 | MySQL 驱动（生产环境） |
| django-cors-headers | 3.2.1 | 跨域支持 |
| Pillow | 7.1.1 | 图片处理 |
| uWSGI | - | 生产部署 |

### 前端

| 技术 | 版本 | 说明 |
|------|------|------|
| React | 16.13 | UI 框架 |
| React Router | 5.1.2 | 路由管理 |
| Redux + Redux-Thunk | 4.0.5 | 状态管理 |
| Ant Design | 4.0.1 | UI 组件库 |
| Axios | 0.19.2 | HTTP 请求 |
| ECharts | 4.6.0 | 数据可视化 |
| react-loadable | 5.5.0 | 路由懒加载 |

### 数据库

| 数据表 | 说明 |
|--------|------|
| UserInfo | 用户信息（扩展 Django AbstractUser） |
| Site | 站点信息（名称、位置、状态） |
| WaterData | 水务数据（PH、浑浊度、溶解氧、水温、电导率、余氯） |
| DataSite | 水务数据统计（合格率） |
| Dev | 设备信息（名称、编号、SIM卡、位置、维护人员） |
| InfoShares | 信息分享/发布（内容、图片、发布人） |
| Log | 登录日志 |
| OperationLogs | 管理员操作日志 |

## API 接口

### 用户模块

| 接口 | 方法 | 说明 |
|------|------|------|
| `/users/regist` | POST | 用户注册 |
| `/users/login` | POST | 用户登录（返回 JWT Token） |
| `/users/find` | GET | 查询用户信息 |
| `/users/updata` | POST | 更新用户基本信息 |
| `/users/uppwd` | POST | 修改密码 |

### 设备模块

| 接口 | 方法 | 说明 |
|------|------|------|
| `/dev/adddev` | POST | 新增设备 |
| `/dev/updatedev` | POST | 更新设备信息 |
| `/dev/dltdev` | POST | 删除设备 |
| `/dev/finddev` | POST | 查询设备（分页） |
| `/dev/findalldev` | POST | 查询所有设备 |

### 信息分享模块

| 接口 | 方法 | 说明 |
|------|------|------|
| `/share/add` | POST | 发布信息 |
| `/share/contentpage` | POST | 分页查询分享内容 |
| `/share/contentall` | POST | 查询全部分享内容 |
| `/share/upload` | POST | 上传图片 |

### 水务数据模块

| 接口 | 方法 | 说明 |
|------|------|------|
| `/water/` | GET | 大屏页面展示（模板渲染） |
| `/echarts/` | GET | ECharts 折线图数据 |
| `/map/` | GET | 地图站点数据 |
| `/water/form/` | GET/POST | 数据录入表单 |

### 日志模块

| 接口 | 方法 | 说明 |
|------|------|------|
| `/getlogs` | GET | 获取登录日志 |
| `/getlogs/all` | GET | 获取全部登录日志 |
| `/adminlogs` | GET | 获取操作日志 |
| `/adminlogs/all` | GET | 获取全部操作日志 |

## 快速开始

### 环境要求

- Python 3.6+
- Node.js 14+（Node 17+ 需设置 `NODE_OPTIONS=--openssl-legacy-provider`）
- MySQL 5.7+（生产环境）/ SQLite（本地开发默认）
- npm 或 yarn

### 后端启动

```bash
# 1. 进入后端目录
cd water_py

# 2. 安装依赖
pip install -r requirements.txt

# 3. 执行数据库迁移（默认使用 SQLite，无需额外配置）
python manage.py migrate

# 4. 创建超级用户
python manage.py createsuperuser

# 5. 启动开发服务器
python manage.py runserver 0.0.0.0:8000
```

> **本地开发**：默认使用 SQLite 数据库，开箱即用，无需安装 MySQL。  
> **切换 MySQL**：编辑 `Water_demo/settings.py`，取消注释 MySQL 配置并注释掉 SQLite 配置，同时在 `Water_demo/__init__.py` 中取消注释 `pymysql.install_as_MySQLdb()`。

### 前端启动

```bash
# 1. 进入前端目录
cd water_react

# 2. 安装依赖
npm install --legacy-peer-deps

# 3. 启动开发服务器（自动代理到后端 8000 端口）
npm start
```

> **Node.js 17+ 注意**：项目使用 webpack 4，需要 `--openssl-legacy-provider` 选项（已内置在 npm start 脚本中）。

前端开发服务器默认运行在 `http://localhost:3000`，通过 `http-proxy-middleware` 将 `/api` 请求代理到后端 `http://localhost:8000`。

### 生产部署

```bash
# 1. 构建前端静态资源
cd water_react
npm run build

# 2. 将构建产物复制到 Django 静态目录
cp -r build/static/* ../water_py/static/
cp -r build/index.html ../water_py/templates/

# 3. 使用 uWSGI 部署后端
cd water_py
# 修改 uwsgi.ini 中的项目路径和虚拟环境路径
uwsgi --ini uwsgi.ini

# 4. 配置 Nginx 反向代理（推荐）
# 将静态文件和 API 请求统一由 Nginx 分发
```

## 项目特点

- **前后端不分离架构**：官网大屏由 Django 模板直接渲染，管理后台为 React SPA，两者共享同一后端
- **JWT 认证**：采用 JWT Token 进行接口鉴权，前端 Axios 拦截器自动携带 Token
- **RBAC 权限控制**：区分普通管理员和 root 超级管理员权限
- **数据可视化**：ECharts 图表 + 地图展示水务数据
- **操作审计**：完整的登录日志和操作日志记录
- **本地开箱即用**：默认使用 SQLite 数据库，无需安装 MySQL 即可本地运行

## 访问地址

| 页面 | 地址 | 说明 |
|------|------|------|
| 管理后台 | http://localhost:3000 | React SPA，需先登录 |
| 大屏展示 | http://localhost:8000/water/ | Django 模板渲染 |
| 数据录入 | http://localhost:8000/water/form/ | 站点数据录入表单 |
| Django Admin | http://localhost:8000/admin/ | 后台管理 |
