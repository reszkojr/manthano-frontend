import { BiImageAdd, BiSolidSend } from 'react-icons/bi';
import { HiOutlineEmojiHappy } from 'react-icons/hi';
import { FiAtSign } from 'react-icons/fi';
import { AiOutlineGif } from 'react-icons/ai';

import { KeyboardEvent, useRef, useState } from 'react';
import { useClassroomContext } from '../hooks/UseClassroomContext';

import './ChannelInput.css';

const ChannelInput = () => {
	const [inputContent, setInputContent] = useState('');

	const { sendMessage } = useClassroomContext();

	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	const handleMessageSend = () => {
		if (inputContent.trim() == '') return;
		const message = {
			text: inputContent,
		};
		sendMessage(message);
		setInputContent('');
	};

	const handleTextAreaEnter = (event: KeyboardEvent) => {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			handleMessageSend();
		}
	};

	const handleTouchEnd = (event: TouchEvent) => {
		event.preventDefault();
		handleMessageSend();
	};

	return (
		<div className='m-4 mt-0 overflow-auto rounded-md border border-gray-600 px-2 pt-2 shadow-2xl'>
			<div className='mb-2 flex gap-4'>
				<textarea ref={textAreaRef} value={inputContent} onKeyDown={handleTextAreaEnter} onChange={(event) => setInputContent(event.target.value)} spellCheck={false} id='message_input' className='min-h-8 max-h-28 w-full resize-none border-none bg-transparent p-0 text-gray-50 outline-none' />
				<BiSolidSend onTouchEnd={handleTouchEnd} onClick={handleMessageSend} className='mb-auto h-auto w-6 hover:cursor-pointer hover:brightness-150 hover:filter' />
			</div>
			<div className='h-8'>
				<ul className='mb-auto flex items-center gap-3'>
					<li>
						<BiImageAdd className='h-auto w-5 hover:cursor-pointer hover:brightness-150 hover:filter' />
					</li>
					<li>
						<AiOutlineGif className='h-auto w-6 hover:cursor-pointer hover:brightness-150 hover:filter' />
					</li>
					<li>
						<HiOutlineEmojiHappy className='h-auto w-5 hover:cursor-pointer hover:brightness-150 hover:filter' />
					</li>
					<li>
						<FiAtSign className='h-auto w-5 hover:cursor-pointer hover:brightness-150 hover:filter' />
					</li>
				</ul>
			</div>
		</div>
	);
};

export default ChannelInput;
