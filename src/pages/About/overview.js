// Overview.js
import { Typography, Divider } from 'antd';

const { Title, Paragraph, Text } = Typography;
export default () => {
    return (
    <Typography>
    <Title>Overview</Title>
    <Paragraph>
        Despite huge levels of investment in IT infrastructure the current state of operational enterprise network security continues to be abysmal. Existing appliance-based solutions are closed, inflexible, unscaleable and expensive. As enterprise network speeds increase to 100 Gb/s and beyond a new approach is required.
    </Paragraph>
    <Paragraph>
    Nozzle combines software-defined networking (SDN) and network function virtualisation (NFV) in a novel way to decouple “data collection” from “data analytics”, thus enabling the use of machine learning and AI methods for cyber-security analytics in software while maintaining high speed data forwarding in (OpenFlow and P4) programmable hardware.
    </Paragraph>
    <Title level={3}>People</Title>
        <ul>
            <li>Craig Russell (D61)</li>
            <li>Minzhao Lyu (UNSW, D61)</li>
            <li>Jawad Ahmed (UNSW, D61)</li>
            <li>Vijay Sivaraman (UNSW)</li>
            <li>Hassan Habibi Gharakheili (UNSW)</li>
        </ul>
    <Title level={3}>News</Title>
        <ul><li>Nozzle is co-funded by DSTG and AARNet and will be undergoing operational trials on a campus network in 2019.</li></ul>
    <Title level={3}>Publications</Title>
        <ul>
            <li>Jawad Ahmed, Hassan Habibi Gharakheili, Qasim Raza, Craig Russell and Vijay Sivaraman, “Real-Time Detection of DNS Exfiltration and Tunneling from Enterprise Networks”, accepted to IFIP/IEEE International Symposium on Integratyed Network Management 2019.</li>
            <li>Minzhao Lyu, Hassan Habibi Gharakheili, Craig Russell and Vijay Sivaraman, “Mapping an Enterprise Network by Analysing DNS Traffic”, submitted to PAM2019.</li>
        </ul>
    </Typography>
    )
};
