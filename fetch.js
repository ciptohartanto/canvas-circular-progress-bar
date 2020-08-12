const getAPI = () => {
  const x = fetch('https://reqres.in/api/users').then(res => {
    if (res.ok) {
      return res.json()
    } else {
      console.log('error')
      return
    }
  }).then(data => {
    return data
  })

  return x

}

export default getAPI