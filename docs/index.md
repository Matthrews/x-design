## Hello x-design!

😍 基于 React 的企业级 UI 组件库 ❤

## 面向用户

**C 端用户**

## 参考

- 阿里

  - [Ant Design](https://ant.design/index-cn)
  - [Fusion Design](https://fusion.design/pc/component)

- Netease

  - [Fish Design](https://nsfi.github.io/ppfish-components)

- 饿了么

  - [Element UI](https://element-plus.gitee.io)

- Goole

  - [Material Design](https://material-ui.com)

- 有赞

  - [Zan Design](https://design.youzan.com/components.html)

- 其他
  - [以网易 FishDesign 为例：企业级 UI 组件库的设计方法与实践](http://www.woshipm.com/pd/3030168.html)
  - [B 端业务与 C 端的 4 个区别](http://www.woshipm.com/it/4438434.html)
  - [移动端组件库盘点](https://www.bilibili.com/read/cv6257291/)
  - [最全 Web 端 UI 组件库详解](https://zhuanlan.zhihu.com/p/141734324)
  - [设计师值得收藏的 8 个 Web 端组件库](https://www.jianshu.com/p/d34069292682)
  - [对话框和抽屉的使用场景浅析](http://www.woshipm.com/pd/4355442.html)
  - https://react-responsive-modal.leopradel.com/
  - http://fish-docs.sdp.101.com/

## 阶段性设计原则

### 第一阶段

- 基础组件要非常好用，降低使用方自己造轮子的可能性

- 功能组件 80%功能正常可用

- 文档简洁

- 打包体积

### 第二阶段

- 兼容问题

- UI 配置化

- Accessibility

- 打包体积

### 第三阶段

- 自动化测试

- 性能测试

## Mask 组件设计规划

- 遮罩层应该是基础组件

## Modal 组件设计规划

- 结构分为两部分：mask 和 content

- z-index 不够高怎么办？

- 如何设计 close-x

- 如何设计 footer

- 如何解决多个 modal 的问题

- 如何 focus

- 如何设计展示消失动画

- 如何自定义挂载位置

- 如何考虑 Accessibility
