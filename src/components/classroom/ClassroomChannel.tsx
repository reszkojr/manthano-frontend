import ChannelHeader from './ChannelHeader';
import ChannelInput from './ChannelInput';
import ChannelChat from './ChannelChat';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useClassroomContext } from '../hooks/UseClassroomContext';

const ClassroomChannel = () => {
	const { channel_code } = useParams();

	const { classroom, setClassroom } = useClassroomContext();

	useEffect(() => {
		const channel = classroom?.channels.find((ch) => ch.name === channel_code);
		setClassroom((prev) => ({ ...prev!, activeChannel: channel }));
	}, [channel_code, classroom?.channels, setClassroom]);

	return (
		<div className='flex h-full flex-col bg-gray-800'>
			<ChannelHeader />
			<ChannelChat />
			<ChannelInput />
		</div>
	);
};

export default ClassroomChannel;
