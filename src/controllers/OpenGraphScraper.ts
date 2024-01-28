import ogs from 'open-graph-scraper';

const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36';
const options = { url: 'https://mvp.microsoft.com/en-US/studentambassadors/profile/ff9d3bb7-25f6-477c-875d-37904a0c6280', fetchOptions: { headers: { 'user-agent': userAgent } } }

ogs(options)
  .then((data) => {
    const { error, html, result, response } = data;
    // console.log('error:', error);
    // console.log('html:', html);
    
    console.log('result:', result.ogImage[0].url);
    // console.log('response:', response);
  })
  .catch((err) => {
    console.log(err)
  })