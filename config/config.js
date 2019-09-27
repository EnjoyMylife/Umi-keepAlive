import pageRouter from './router.config'

export default {
  singular: true, // true->src/pages == false->src/page
  plugins: [
    ['umi-plugin-react', {
      // 添加配置，该插件会有作用
      antd: true
    }],
  ],
  routes: pageRouter,
};