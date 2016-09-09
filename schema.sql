-- 项目管理表: restful_projects
CREATE TABLE `restful_projects` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL COMMENT '项目名称',
  `desc` VARCHAR(256) NULL COMMENT '项目描述',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) COMMENT='项目管理表';

-- 项目环境表: restful_envs
CREATE TABLE `restful_envs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL COMMENT '环境名称',
  `desc` VARCHAR(256) NULL COMMENT '环境描述',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) COMMENT='项目管理表';

-- 项目应用表: restful_project_applications
CREATE TABLE `restful_applications` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `projectId` bigint(20) NOT NULL COMMENT '项目ID',
  `envId` bigint(20) NOT NULL COMMENT '环境ID',
  `name` VARCHAR(50) NOT NULL COMMENT '应用名称',
  `desc` VARCHAR(256) NULL COMMENT '应用描述',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) COMMENT='项目应用表';

-- 应用API接口表: restful_apis
CREATE TABLE `restful_apis` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `applicationsId` bigint(20) NOT NULL COMMENT '应用ID',
  `info_title` VARCHAR(50) NOT NULL COMMENT '应用名称',
  `info_description` VARCHAR(256) NULL COMMENT '应用描述',
  `info_version` VARCHAR(256) NULL COMMENT '文档版本号',
  `info_terms_of_service` VARCHAR(256) NULL COMMENT '文档版本号',
  `info_contact_name` VARCHAR(256) NULL COMMENT '作者名称',
  `info_contact_email` VARCHAR(256) NULL COMMENT '作者邮箱',
  `info_terms_of_service` VARCHAR(256) NULL COMMENT '文档版本号',
  `info_license_name` VARCHAR(256) NULL COMMENT '证书',
  `info_license_url` VARCHAR(256) NULL COMMENT '证书链接',
  `host` VARCHAR(256) NULL COMMENT '文档版本号',
  `basePath` VARCHAR(256) NULL COMMENT 'api根路径',
  `swagger` VARCHAR(8) NULL COMMENT 'swagger版本号',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) COMMENT='应用API接口表';

-- Api path表: restful_api_paths
CREATE TABLE `restful_api_paths` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `apiId` bigint(20) NOT NULL COMMENT '接口表ID',
  `tags` VARCHAR(64) NOT NULL COMMENT '标记',
  `path` VARCHAR(128) NOT NULL COMMENT 'api地址',
  `method` VARCHAR(64) NOT NULL COMMENT 'httpMethod',
  `summary` VARCHAR(50) NOT NULL COMMENT '',
  `description` VARCHAR(256) NULL COMMENT '描述',
  `produces` VARCHAR(256) NULL COMMENT 'application/json',
  `parameters` VARCHAR(512) NULL COMMENT '参数JOSN串',
  `responses` VARCHAR(512) NULL COMMENT '返回状态JOSN串',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) COMMENT='Api path表';

-- Api definition表
CREATE TABLE `restful_api_definitions` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `apiId` bigint(20) NOT NULL COMMENT '接口表ID',
  `name` VARCHAR(64) NOT NULL COMMENT '定义名称',
  `type` VARCHAR(64) NOT NULL COMMENT '参数类型',
  `properties` VARCHAR(50) NOT NULL COMMENT '字段JSON',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) COMMENT='Api definition表';
