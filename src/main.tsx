import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Amplify } from 'aws-amplify';
import './index.css'
import App from './App.tsx'

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_vgfda1CTg',
      userPoolClientId: '6c28aanu9bj3s56g7q3ee974u4',
    }
  },
  API: {
    REST: {
      "aws-jess": {
        endpoint: 'https://3gjy989wfc.execute-api.us-east-1.amazonaws.com',
        region: 'us-east-1',
      },
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className='h-screen bg-gray-800'>
      <App />
    </div>
  </StrictMode>,
)
