import { FormEvent, useState } from 'react';
import useWebSocket from 'react-use-websocket';

import { useAuth } from '../../components/hooks/UseAuth';
import Sidebar from '../../components/classroom/Sidebar';
import NavigationPanel from '../../components/classroom/NavigationPanel';
import Channel from '../../components/classroom/Channel';

const ClassroomPage = () => {
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState<string[]>([]);
	const { token } = useAuth();

	const { sendJsonMessage } = useWebSocket(`ws://localhost:8000/ws/info4/?token=${token}`, {
		onMessage: (event: MessageEvent) => {
			const data = JSON.parse(event.data);
			const message = `${data['user']}: ${data['message']}`;
			setMessages([...messages, message]);
		},
		reconnectAttempts: 2,
	});

	const handleMessageSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const message = event.currentTarget.message.value;
		sendJsonMessage({ message: message });

		setMessage('');
		// setMessages([...messages, message]);
	};

	return (
		<div className='flex w-full'>
			<div className='flex w-min'>
				<Sidebar />
				<NavigationPanel />
			</div>
			<div className='w-full'>
				<Channel />
			</div>
		</div>
		// 		<div className='w-96 h-96 bg-gray-800 rounded-lg m-auto'>
		// 	<div className='w-full h-full mb-4 p-4'>
		// 		{messages.map((message, i) => (
		// 			<div key={i}>{message}</div>
		// 		))}
		// 	</div>
		// 	<form method='POST' onSubmit={handleMessageSubmit}>
		// 		<TextInputWithButton type='text' value={message} onChange={(e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)} className='flex-1 w-full' name='message' placeholder='Type your message here' buttonLabel='Send' buttonType='submit' />
		// 	</form>
		// </div>
	);
};

export default ClassroomPage;
