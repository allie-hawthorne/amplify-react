import { useEffect, useState } from 'react';
import { get, post } from 'aws-amplify/api';
import { fetchAuthSession } from 'aws-amplify/auth';
import { Button, Input } from './shared';

const API_NAME = 'aws-jess';
const PATH = '/message';

export const Chat = () => {
  const [messages, setMessages] = useState<Record<string, string>[]>([]);
  
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    fetchAuthSession().then(s => setToken(s.tokens?.accessToken?.toString() ?? ''));    
  }, []);

  useEffect(() => {
    if (!token) return;

    getMessages().then(setMessages);
  }, [token]);

  async function getMessages() {
    const res = await get({
      apiName: API_NAME,
      path: PATH,
      options: {headers: {Authorization: `Bearer ${token}`}}
    }).response;

    const json = await res.body.json();

    // TODO: can we remove this typecast?
    return json as Record<string, string>[];
  }
  
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

    // TODO: Provide submitted confirmation
    await response.body.json();
  }
  
  return <div className='flex flex-col gap-4'>
    <div className='h-80 w-full bg-pink-600/50 rounded-2xl flex flex-col justify-end gap-2 p-3'>
      {messages?.map((m, i) => <div className='flex items-center justify-between' key={i}>
        <p className='text-pink-300'>{new Date(m.timestamp).toLocaleTimeString().substring(0, 5)}</p>
        <p className='bg-white/20 text-black w-fit text-right self-end py-2 px-5 rounded-4xl'>{m.message}</p>
      </div>)}
    </div>
    <form className='flex flex-col gap-2' onSubmit={e => e.preventDefault()}>
      <Input placeholder='message' value={message} setState={setMessage} />
      <Button onClick={submitMessage}>Submit</Button>
    </form>
  </div>
}