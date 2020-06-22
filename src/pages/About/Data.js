// Data.js
import { Typography, Divider } from 'antd';

const { Title, Paragraph, Text } = Typography;
export default () => {
    return (
        <Typography>
            <Title>Project Nozzle: Enterprise Network Security</Title>
            <Title level={3}>DNS Exfiltration datasets</Title>
                <ul>
                    <li>
                    (a) DET Tool: We release the DET dataset in the form of a CSV file containing 1,400,000 DNS exfiltration queries. The dataset can be downloaded here:
                    <a href="https://nozzle-data.sdn.unsw.edu.au/dns-exfiltration-dataset/files/ExfiltrationAttackFQDNs.csv" target="_blank">Download</a>
                    </li>
                    <li>
                    (b) Iodine Tool:We release the Iodine dataset in the form of a CSV file containing 2,200,000 DNS exfiltration queries. The dataset can be downloaded here:
                    <a href="https://nozzle-data.sdn.unsw.edu.au/dns-exfiltration-dataset/files/IodineExfiltrationAttackFQDNs.csv" target="_blank">Download</a>
                    </li>
                </ul>
            <Title level={3}>Classification of Live DNS Traffic as benign or malicious</Title>
            <Paragraph>
                A live stream of DNS traffic and its analysis results using our method is available here:
                <a href="https://nozzle-data.sdn.unsw.edu.au/dnsQueries" target="_blank">Link</a>
            </Paragraph> 
            <Title level={4}>Citing Our Data</Title>
            <Paragraph>J. Ahmed, H. Habibi Gharakheili, Q. Raza, C. Russell and V. Sivaraman, "Real-Time Detection of DNS Exfiltration and Tunneling from Enterprise Networks",
Accepted for publication at IFIP/IEEE International Symposium on Integrated Network Management, Washington DC, USA, April 2019.</Paragraph>
        </Typography>
    )
};