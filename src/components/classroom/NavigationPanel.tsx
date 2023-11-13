import { FaHashtag, FaVolumeDown } from 'react-icons/fa';
import { AiFillCloseCircle, AiOutlinePlus } from 'react-icons/ai';
import { MdExpandMore } from 'react-icons/md';
import classNames from 'classnames';
import Modal from 'react-modal';

import { useClassroomContext } from '../hooks/UseClassroomContext';

import './NavigationPanel.css';
import { useEffect, useState } from 'react';
import TextInput from '../elements/TextInput';
import Button from '../elements/Button';
import Submit from '../elements/Submit';
import useApi from '../../hooks/useApi';
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root');
Modal.defaultStyles.overlay!.backgroundColor = 'rgba(0, 0, 0, 0.6)';

const NavigationPanel = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [channelName, setChannelName] = useState('');
	const [isMobile, setIsMobile] = useState(false);
	const navigate = useNavigate();

	const { classroom, setClassroom, isPanelCollapsed, setPanelCollapsed } = useClassroomContext();
	const api = useApi();

	useEffect(() => {
		const mobileMediaQuery = window.matchMedia('(max-width: 767px)');
		setIsMobile(mobileMediaQuery.matches);
		mobileMediaQuery.addEventListener('change', (event) => setIsMobile(event.matches));
		return () => {
			mobileMediaQuery.removeEventListener('change', (event) => setIsMobile(event.matches));
		};
	}, []);

	const handleChannelChange = (key: number) => {
		if (isMobile) {
			setPanelCollapsed(true);
		}
		const channel = classroom?.channels.find((ch) => ch.id === key);
		setClassroom((prev) => ({ ...prev!, activeChannel: channel }));
		navigate(`${channel?.name}`);
	};

	const handleAddChannelSubmit = () => {
		setModalOpen(false);
		api.post('/classroom/channel/add', { channel_name: channelName }).then((response) => {
			const channel = response.data;
			setClassroom((prev) => ({
				...prev!,
				channels: [...prev!.channels, channel],
				activeChannel: channel,
			}));
		});
	};

	return (
		<div className={classNames('h-full border-r border-r-gray-600 bg-gray-800 transition-[width] duration-200', { collapsed: isPanelCollapsed, 'w-56': !isPanelCollapsed })}>
			<div className={classNames('flex flex-col gap-3 transition-opacity duration-200', { 'invisible opacity-0': isPanelCollapsed })}>
				<div className='flex h-12 w-full items-center justify-between border-b border-b-gray-600 px-4'>
					<span className='my-auto min-w-max text-xl font-bold text-gray-50'>{classroom?.name}</span>
				</div>
				<div className='space-y-4 px-3'>
					<ul className='flex flex-col gap-2'>
						<li className='flex min-w-max items-center justify-between'>
							<div className='flex min-w-max items-center gap-2 text-sm text-gray-300 hover:cursor-pointer hover:brightness-150 hover:filter'>
								CHANNELS <MdExpandMore />
							</div>
							<AiOutlinePlus onClick={() => setModalOpen(true)} className='text-gray-300 hover:cursor-pointer hover:brightness-150 hover:filter' />
						</li>
						{classroom?.channels.map((channel) => (
							<li key={channel.id} className={classNames('flex min-w-max cursor-pointer items-center gap-2 rounded-md px-4 py-[4px] text-gray-200 hover:bg-gray-600', { 'bg-gray-600 text-gray-200 brightness-125': classroom?.activeChannel?.name === channel.name })} onClick={() => handleChannelChange(channel.id)}>
								<FaHashtag className='text-gray-300 hover:cursor-pointer hover:brightness-150 hover:filter' />
								{channel.name}
							</li>
						))}
					</ul>
					<div className='flex flex-col gap-2'>
						<div className='flex items-center justify-between'>
							<div className='flex min-w-max items-center gap-2 text-sm text-gray-300 hover:cursor-pointer hover:brightness-150 hover:filter'>
								VOICE CHANNELS <MdExpandMore />
							</div>
							<AiOutlinePlus className='text-gray-300 hover:cursor-pointer hover:brightness-150 hover:filter' />
						</div>
						<div className='text-md ml-4 flex min-w-max flex-col gap-1 text-lg'>
							<div className='flex cursor-pointer items-center gap-2 rounded-md px-4 py-[2px] text-gray-200 hover:bg-gray-600'>
								<FaVolumeDown className='h-auto w-4' />
								math
							</div>
							<div className='flex cursor-pointer items-center gap-2 rounded-md px-4 py-[2px] text-gray-200 hover:bg-gray-600'>
								<FaVolumeDown className='h-auto w-4' />
								science
							</div>
							<div className='flex cursor-pointer items-center gap-2 rounded-md px-4 py-[2px] text-gray-200 hover:bg-gray-600'>
								<FaVolumeDown className='h-auto w-4' />
								geography
							</div>
							<div className='flex cursor-pointer items-center gap-2 rounded-md px-4 py-[2px] text-gray-200 hover:bg-gray-600'>
								<FaVolumeDown className='h-auto w-4' />
								chemistry
							</div>
							<div className='flex cursor-pointer items-center gap-2 rounded-md px-4 py-[2px] text-gray-200 hover:bg-gray-600'>
								<FaVolumeDown className='h-auto w-4' />
								english
							</div>
						</div>
					</div>
				</div>
			</div>
			<Modal isOpen={modalOpen} className={'absolute bottom-1/2 right-1/2 h-40 w-[400px] translate-x-1/2 translate-y-1/2 rounded-lg border border-gray-700 bg-gray-800 shadow outline-none transition-all md:w-[500px]'} onRequestClose={() => setModalOpen(false)} contentLabel='Create Channel'>
				<form method='POST' className='flex h-full flex-col items-center justify-center' onSubmit={handleAddChannelSubmit}>
					<AiFillCloseCircle className='absolute right-2 top-2 h-auto w-5 text-gray-300 transition-all duration-150 hover:cursor-pointer hover:brightness-150' onClick={() => setModalOpen(false)} />
					<div className='mb-3 mt-6 w-full p-3'>
						<h1 className='text-gray-200'>Choose a name for your new Channel.</h1>
						<h1 className='text-gray-200'>It can be based on a subject or whatever you want.</h1>
						<TextInput value={channelName} type='text' name='channel_name' placeholder='Channel name' onChange={(event) => setChannelName(event.target.value)} />
					</div>
					<div className='mt-auto flex w-full'>
						<Button label='Cancel' className='mt-auto w-full rounded-none rounded-bl-lg' />
						<Submit label='Create' className='mt-auto w-full rounded-none rounded-br-lg' />
					</div>
				</form>
			</Modal>
		</div>
	);
};

export default NavigationPanel;
