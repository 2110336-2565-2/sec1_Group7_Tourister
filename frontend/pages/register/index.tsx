import { ReactElement } from 'react';
import RegisterForm from '@/components/register/registerForm';
import GuideNavBar from '@/components/layout/guideNavBar';

const Page  = () => {
  return (
  <>
    <GuideNavBar/>
    <h1>Tourister</h1>
    <RegisterForm/>
  </>
  );
}

export default Page
