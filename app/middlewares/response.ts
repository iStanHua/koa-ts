
'use strict'
import { Context } from 'koa'

/**
 * 响应处理模块
 */
export default async (ctx: Context, next: any) => {
    try {
        // 调用下一个 middleware
        await next()
        // 处理响应结果
        // 如果直接写入在 body 中，则不作处理
        // 如果写在 ctx.body 为空，则使用 state 作为响应
        let e = ctx.response.status
        let s = ctx.response.message
        e >= 500 && 'production' == ctx.app.env && (s = '服务器内部错误'),
            ctx.body = ctx.body ? ctx.body : {
                code: ctx.state.code ? ctx.state.code : e,
                data: ctx.state.data ? ctx.state.data : s
            }
    }
    catch (e) {
        // 设置状态码为 200 - 服务端错误
        ctx.status = 200

        // 输出详细的错误信息
        ctx.body = {
            code: -1,
            data: '未知错误'
        }
    }
}