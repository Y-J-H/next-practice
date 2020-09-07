import fs from 'fs'
import path from 'path'


/**
 * @param {*} context
 * 从数据库中获取数据, 执行服务端的操作
 */
export async function getStaticProps(context) {
  // console.log(context)
  /**
   * 异步请求数据
   */
  // const res = await fetch('https://apinew.juejin.im/tag_api/v1/query_category_briefs?show_type=0')
  // const data = await res.json()

  /**
   * 读取本地文件数据, next.js 中无法使用"__dirname", 需要用process.cwd()替代
   */
  const filePath = path.join(process.cwd(), 'mock/blog.json')
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))

  return {
    props: {
      data: data.data
    }
  }
}

function Blog({ data }) {
  return (
    <ul>
      {
        data.map((item) => (
          <li key={item.category_url}>{item.category_name}</li>
        ))
      }
    </ul>
  )
}

export default Blog