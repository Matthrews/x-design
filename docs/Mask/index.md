# Mask

## 何时使用

需要遮住主内容的时候,一般结合 Modal, Notication, Overlay, Drawer 等组件使用

## 基础使用

<code src="./demo/basic">

## 点击蒙层不关闭

<code src="./demo/closabe">

## API

| 属性名       | 描述                 | 类型                                    | 默认值 |
| ------------ | -------------------- | --------------------------------------- | ------ |
| visible      | 是否可见             | <code>boolean<code>                     | (必选) |
| onClose      | onClose              | <code>() => void<code>                  | --     |
| maskClosable | 点击蒙层是否允许关闭 | <code>boolean <code>                    | --     |
| motionName   | 动画名称             | <code>string <code>                     | --     |
| maskProps    | maskProps            | <code>object & { children: ReactNode; } | --     |
| maskClick    | 点击蒙层回调         | <code>Function <code>                   | --     |
