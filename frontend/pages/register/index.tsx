import { ReactElement } from 'react';
import RegisterForm from '@/components/register/registerForm';
import GuideNavBar from '@/components/layout/guideNavBar';

const Page  = () => {
  return (
  <>
    <h1 id='header01' style={{textAlign: 'center'}}>REGISTRATION</h1>
    <RegisterForm/>
  </>
  );
}

export default Page
