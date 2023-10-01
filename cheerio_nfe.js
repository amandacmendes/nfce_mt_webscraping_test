const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.sefaz.mt.gov.br/nfce/consultanfce?p=';

axios.get(url)
    .then((response) => {

        const $ = cheerio.load(response.data);

        const data = [];

        $('table#tabResult tbody tr').each((index, element) => {
            const $row = $(element);

            const txtTit = $row.find('.txtTit').first().text().trim();
            const RCod = $row.find('.RCod').text().trim().replace(/[^\d]/g, '');
            const Rqtd = $row.find('.Rqtd').text().replace('Qtde.:', '').trim();
            const RUN = $row.find('.RUN').text().replace('UN:', '').trim();
            const RvlUnit = $row.find('.RvlUnit').text().replace('Vl. Unit.:', '').trim();
            const Vl_Total = $row.find('.valor').text().trim();

            const itemData = {
                txtTit,
                RCod,
                Rqtd,
                RUN,
                RvlUnit,
                Vl_Total
            };

            data.push(itemData);
        });

        console.log(data);
        console.log("Tamanho do array:" + data.length)

    })
    .catch((error) => {
        console.error('Erro ao acessar a página:', error);
    });