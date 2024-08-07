import classNames from 'classnames';

type TextInputProps = {
	type: string;
	name: string;
	label?: string;
	value?: string | number | readonly string[] | undefined;
	defaultValue?: string | number | readonly string[] | undefined;
	onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
	placeholder?: string;
	className?: string;
	boldLabel?: string;
};

const styles = {
	container: 'flex flex-col space-y-2',
	input: 'py-3 px-3 text-gray bg-gray-900 border border-gray-700 rounded-md',
};

const TextInput = (props: TextInputProps) => {
	return (
		<div className={`${styles.container}${props.className ? ' ' + props.className : ''}`}>
			<label htmlFor={props.name} className={classNames('text-gray-200', { 'font-bold': props.boldLabel })}>
				{props.label}
			</label>
			<input onChange={props.onChange} defaultValue={props.defaultValue} value={props.value} className={`${styles.input}`} type={props.type} name={props.name} placeholder={props.placeholder} />
		</div>
	);
};

export default TextInput;
