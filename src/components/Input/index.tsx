import { ChangeEvent } from 'react';
import * as Styled from './styled';

interface IProps {
    type: string;
    placeholder: string;
    value?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ type, placeholder, value, onChange }: IProps) {

    return (
        <>
            <Styled.Input type={type} placeholder={placeholder} value={value} onChange={onChange} />
        </>
    )
}
