import { ReactElement } from 'react';
import RegisterForm from '@/components/register/registerForm';
import GuideNavBar from '@/components/layout/guideNavBar';
import { NextPageWithLayout } from '../_app';

const Page: NextPageWithLayout = () => {
  return (
  <>
    <h1>Tourister</h1>
    <RegisterForm/>
  </>
  );
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <GuideNavBar>
      {page}
    </GuideNavBar>
  )
}

export default Page
