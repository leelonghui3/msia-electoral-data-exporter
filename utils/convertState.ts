const convertState = (sid: string) => {
  switch (sid) {
    case '01':
      return 'Johor'
    case '02':
      return 'Kedah'
    case '03':
      return 'Kelantan'
    case '04':
      return 'Melaka'
    case '05':
      return 'Negeri Sembilan'
    case '06':
      return 'Pahang'
    case '07':
      return 'Penang'
    case '08':
      return 'Perak'
    case '09':
      return 'Perlis'
    case '10':
      return 'Selangor'
    case '11':
      return 'Terengganu'
    case '12':
      return 'Sabah'
    case '13':
      return 'Sarawak'
    case '14':
      return 'Kuala Lumpur'
    case '15':
      return 'Labuan'
    case '16':
      return 'Putrajaya'
    default:
      return sid
  }
}

export { convertState }
