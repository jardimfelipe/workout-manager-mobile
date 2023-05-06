// useConfirm.ts
import React, { useEffect, useState } from 'react';

import { ConfirmModal } from '../components';
import { ConfirmModalProps } from '../components/atoms/Modals/types';

interface UseConfirmOptions extends Omit<ConfirmModalProps, 'isOpen' | 'onClose'> { }

interface UseConfirmReturn {
    confirm: (options: UseConfirmOptions) => void;
    handleClose: () => void;
    ConfirmModalComponent: React.ReactElement;
}

const useConfirm = (): UseConfirmReturn => {
    const [options, setOptions] = useState<UseConfirmOptions | null>(null);

    const handleClose = () => {
        setOptions(null);
    };

    const confirm = (options: UseConfirmOptions) => {
        setOptions(options);
    };

    return {
        confirm,
        handleClose,
        ConfirmModalComponent: options ? (
            <ConfirmModal
                {...options}
                isOpen={!!options}
                onClose={handleClose}
            />
        ) : null,
    };
};

export default useConfirm;
