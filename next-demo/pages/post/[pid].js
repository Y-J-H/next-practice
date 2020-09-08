import fs from 'fs'
import path from 'path'
import { useRouter } from 'next/router'

const delay = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'mock/blog.json')
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  await delay(3000)
  return { props: { data } }
}

/**
 * fallback: false, 对于未在paths中定义的参数的页面直接跳转到404页面
 * fallback: true, 对于未在paths中定义的参数, 依然会显示预渲染的页面,
 */
export async function getStaticPaths() {
  return {
    paths: [{ params: { pid: '1' } }, { params: { pid: '2' } }],
    fallback: false
  }
}

const Post = ({data}) => {
  const router = useRouter()
  const {pid} = router.query
  // console.log(router)
  if(router.isFallback) {
    return <div>Loading...</div>
  }
  return <p>Post: {pid}</p>
}

export default Post