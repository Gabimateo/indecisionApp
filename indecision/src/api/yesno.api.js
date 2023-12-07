import axios from 'axios';

const API_BASE_URL = 'https://yesno.wtf/api';

async function getYesOrNo() {
  // const url = API_BASE_URL;
  const {data} = await axios.get(API_BASE_URL)
  return data;
}

export{
    getYesOrNo,
}