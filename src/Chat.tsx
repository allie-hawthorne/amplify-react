import { useEffect, useState } from 'react';
import { post } from 'aws-amplify/api';
import { Button, Input } from './shared';
import { fetchAuthSession } from 'aws-amplify/auth';

const API_NAME = 'aws-jess';
const PATH = '/message';

export const Chat = () => {
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    fetchAuthSession().then(s => setToken(s.tokens?.accessToken?.toString() ?? ''));    
  }, []);
  
  async function submitMessage() {
    const response = await post({
      apiName: API_NAME,
      path: PATH,
      options: {
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: { message },
      },
    }).response;

    const data = await response.body.json();

    console.log(data)
  }
  
  return <>
    <form className='flex flex-col gap-2' onSubmit={e => e.preventDefault()}>
      <Input placeholder='message' value={message} setState={setMessage} />
      <Button onClick={submitMessage}>Submit</Button>
    </form>
  </>
}