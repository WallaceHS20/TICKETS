import Header from '../../components/Header/index'
import Title from '../../components/Title'
import { FiUser } from 'react-icons/fi'

export default function Customers() {
    return (
        <div>
            <Header/>
            <div className='content'>

                <Title>
                    <FiUser />
                </Title>
            </div>
        </div>
    )
}