// base64 => FormData  使用 blob > ie9
const base64ToFormData = base64String => {

  let bytes = window.atob(base64String.split(',')[1]),
    bff = new ArrayBuffer(bytes.length),
    ut = new Uint8Array(bff)

  for (let i = 0, len = bytes.length; i < len; i++) ut[i] = bytes.charCodeAt(i)

  
  let type = ''
  
  try {

    type = base64String.split(';')[0].split(':')[1]

  } catch (err) {

    type = 'image/png'

  }

  let blob = new Blob([bff], { type: type }),
    fd = new FormData()

  fd.append('file', blob, Date.now() + '.' + type.split('/')[1])

  return fd

}

export default {

  base64ToFormData

}
