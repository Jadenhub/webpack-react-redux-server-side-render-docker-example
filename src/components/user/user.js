import React from 'react';
import styled from 'styled-components';
import { withI18n } from '../decorator/i18n';
import Text from '../text/Text';

const UserWrapper = styled.div`
  border: 1px solid rgb(151, 151, 151);
  box-shadow: 1px 1px 4px 1px rgba(114, 114, 114, 0.5);
  padding: 10px 20px;
`;
const TextWrapper = styled.div`
  margin: 5px 0;
`


function User({
  id,
  i18n,
  address= {},
  company = {},
  email,
  name,
  phone,
  website
}){
  const {street, city} = address;
  return (
    <UserWrapper>
      <Text label={i18n['NAME']} >{name}</Text>
      <Text label={i18n['EMAIL']} >{email}</Text>
      <Text label={i18n['COMPANY']} >{company.name}</Text>
      <Text label={i18n['PHONE']} >{phone}</Text>
      <Text label={i18n['ADDRESS']} >{`${street}, ${city}`}</Text>
      <Text label={i18n['WEBSITE']}>
        <a 
          href={`http://${website}`}
          target="_blank"
        >
          {website}
        </a>
      </Text>
    </UserWrapper>
  )
};

export default withI18n(User)