## Hello x-design!

😍 基于 React 的企业级 UI 组件库 ❤

## 面向用户

**C 端用户**

## 参考

- https://material-ui.com/zh/components/dialogs/
- https://react-responsive-modal.leopradel.com/
- https://ant.design/components/modal-cn/#components-modal-demo-position
- https://element.eleme.cn/#/zh-CN/component/dialog
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
