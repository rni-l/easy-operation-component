const config: any = {
  apiPath: '/trade',
  imgDomain: 'm',
  replaceImgKey: '/imgFileDoc',
  webDomain: '',
  appContainerId: 'app'
}

export { config }

export function setStaticConfig(data: any) {
  Object.keys(data).forEach(v => {
    config[v] = data[v]
  })
}
