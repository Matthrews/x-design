## Modal

## 何时使用

按照内容分类，可用于信息确认、操作反馈、表单编辑、内容展示四类使用场景

## 基本对话框

<code src="./demo/basic.tsx">

## 自定义 Modal 页脚

<code src="./demo/footer.tsx">

<!-- ## 定时关闭

<code src="./demo/count.tsx">

## 异步关闭

<code src="./demo/async.tsx">

## 信息提示

<code src="./demo/notification.tsx"> -->

## 自定义挂载位置

<code src="./demo/getContainer.tsx">

## 嵌套 Modal

<code src="./demo/multiple.tsx">

## 全屏 Modal

<code src="./demo/fullScreen.tsx">

<!-- ## API

| 属性名       | 描述          | 类型                                                   | 默认值                    |
| ------------ | ------------- | ------------------------------------------------------ | ------------------------- |
| visible      | 是否可见      | <code>boolean<code>                                    | (必选)                    |
| okCancel     | okCancel      | <code>() => void<code>                                 | --                        |
| getContainer | 挂载 DOM 节点 | <code>() => HTMLElement \| HTMLElement \| string<code> | <code>document.body<code> |

## ConfirmProps

| 属性名  | 描述     | 类型                                                                           | 默认值 |
| ------- | -------- | ------------------------------------------------------------------------------ | ------ |
| type    | 提示类型 | <code>'info' \| 'success' \| 'confirm' \| 'warn' \| 'warning' \| 'error'<code> | --     |
| title   | 提示标题 | <code>string<code>                                                             | --     |
| content | 提示内容 | <code>React.ReactNode<code>                                                    | --     |

## FooterProps

| 属性名         | 描述             | 类型                               | 默认值 |
| -------------- | ---------------- | ---------------------------------- | ------ |
| footer         | 自定义页脚       | <code>React.ReactNode \| null<code>        | --     |
| okText         | 确定文案         | <code>React.ReactNode<code>        | --     |
| cancelText     | 取消文案         | <code>React.ReactNode<code>        | --     |
| confirmLoading | 异步确认 Loading | <code>boolean<code>                | --     |
| onOk           | 确定回调         | <code>(envent?: any) => void<code> | --     |
| onCancel       | 取消回调         | <code>(envent?: any) => void<code> | --     |

## CloseProps

| 属性名   | 描述         | 类型                               | 默认值 |
| -------- | ------------ | ---------------------------------- | ------ |
| closable | 是否可以关闭 | <code>boolean<code>                | --     |
| icon     | 关闭 icon    | <code>string<code>                 | --     |
| onClose  | 关闭回调     | <code>(envent?: any) => void<code> | --     |

## StyleProps

| 属性名       | 描述        | 类型                            | 默认值 |
| ------------ | ----------- | ------------------------------- | ------ |
| wrapperStyle | 包裹样式    | <code>React.CSSProperties<code> | --     |
| headerStyle  | header 样式 | <code>React.CSSProperties<code> | --     |
| bodyStyle    | body 样式   | <code>React.CSSProperties<code> | --     |
| footerStyle  | footer 样式 | <code>React.CSSProperties<code> | --     | -->
