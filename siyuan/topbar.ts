/*
 * MIT License
 *
 * Copyright (c) 2023. Terwer
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import SiyuanBlog from "./index"
import { DeviceDetection, DeviceTypeEnum } from "zhi-device"
import { icons } from "./utils/svg"
import { Dialog, Menu } from "siyuan"

/**
 * 顶栏按钮
 *
 * @param pluginInstance - 插件实例
 * @author terwer
 * @version 0.0.1
 * @since 0.0.1
 */
export function initTopbar(pluginInstance: SiyuanBlog) {
  const topBarElement = pluginInstance.addTopBar({
    icon: icons.iconTopbar,
    title: pluginInstance.i18n.siyuanBlog,
    position: "right",
    callback: () => {},
  })

  topBarElement.addEventListener("click", async () => {
    const sharePage = "/plugins/siyuan-blog/#/share"
    showPage(pluginInstance, sharePage)
  })

  // 添加右键菜单
  topBarElement.addEventListener("contextmenu", async () => {
    let rect = topBarElement.getBoundingClientRect()
    // 如果获取不到宽度，则使用更多按钮的宽度
    if (rect.width === 0) {
      rect = document?.querySelector("#barMore")?.getBoundingClientRect() as any
    }
    await initContextMenu(pluginInstance, rect)
  })
}

const initContextMenu = async (pluginInstance: SiyuanBlog, rect: DOMRect) => {
  const menu = new Menu("blogContextMenu")

  menu.addItem({
    iconHTML: icons.iconTopbar,
    label: pluginInstance.i18n.setting,
    click: () => {
      showSettingPage(pluginInstance)
    },
  })

  menu.addSeparator()
  menu.addItem({
    iconHTML: icons.iconTopbar,
    label: pluginInstance.i18n.showHome,
    click: () => {
      const blogIndex = "/plugins/siyuan-blog/#/"
      showPage(pluginInstance, blogIndex)
    },
  })

  if (pluginInstance.isMobile) {
    menu.fullscreen()
  } else {
    menu.open({
      x: rect.right,
      y: rect.bottom,
      isLeft: true,
    })
  }
}

export const showSettingPage = (pluginInstance: SiyuanBlog) => {
  const settingPage = "/plugins/siyuan-blog/#/setting"
  showPage(pluginInstance, settingPage)
}

const showPage = (pluginInstance: SiyuanBlog, blogIndex: string) => {
  const contentHtml = `<style>
        iframe {
          width: 100%;
          height: 100%;
          border: none;
        }
        </style>
        <iframe src="${blogIndex}" width="100%"></iframe>`

  new Dialog({
    title: pluginInstance.i18n.siyuanBlog,
    transparent: false,
    content: contentHtml,
    width: "60%",
    height: "550px",
  } as any)
}