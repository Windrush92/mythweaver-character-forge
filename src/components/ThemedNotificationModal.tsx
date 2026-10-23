import React from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  XCircle,
  Moon,
  Coffee,
  Sparkles,
  Dices,
  X,
  Shield,
  Heart,
} from 'lucide-react';

export type ThemedModalType =
  | 'warning'
  | 'info'
  | 'success'
  | 'danger'
  | 'rest'
  | 'dice';

export interface ThemedNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: React.ReactNode;
  subtitle?: string;
  type?: ThemedModalType;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  extraContent?: React.ReactNode;
}

export const ThemedNotificationModal: React.FC<ThemedNotificationModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  subtitle,
  type = 'info',
  confirmText = 'Entendido',
  cancelText,
  onConfirm,
  extraContent,
}) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    } else {
      onClose();
    }
  };

  const getIconAndStyle = () => {
    switch (type) {
      case 'warning':
        return {
          icon: <AlertTriangle className="w-6 h-6 text-[#b88c32]" />,
          iconBg: 'bg-[#fef8ea] border-[#e8c37d]',
          headerBorder: 'border-[#d8be8a]',
          glow: 'shadow-[0_0_20px_rgba(184,140,50,0.25)]',
        };
      case 'danger':
        return {
          icon: <XCircle className="w-6 h-6 text-[#9e2d26]" />,
          iconBg: 'bg-[#faecea] border-[#e4a8a5]',
          headerBorder: 'border-[#d49995]',
          glow: 'shadow-[0_0_20px_rgba(158,45,38,0.25)]',
        };
      case 'success':
        return {
          icon: <CheckCircle2 className="w-6 h-6 text-[#2e7d32]" />,
          iconBg: 'bg-[#edf7ed] border-[#a5d6a7]',
          headerBorder: 'border-[#a5d6a7]',
          glow: 'shadow-[0_0_20px_rgba(46,125,50,0.25)]',
        };
      case 'rest':
        return {
          icon: <Moon className="w-6 h-6 text-[#4a6b82]" />,
          iconBg: 'bg-[#eef5fa] border-[#b0cde3]',
          headerBorder: 'border-[#b0cde3]',
          glow: 'shadow-[0_0_20px_rgba(74,107,130,0.25)]',
        };
      case 'dice':
        return {
          icon: <Dices className="w-6 h-6 text-[#8c672b]" />,
          iconBg: 'bg-[#f7edd8] border-[#d8be8a]',
          headerBorder: 'border-[#d8be8a]',
          glow: 'shadow-[0_0_20px_rgba(140,103,43,0.25)]',
        };
      case 'info':
      default:
        return {
          icon: <Info className="w-6 h-6 text-[#8c672b]" />,
          iconBg: 'bg-[#f7edd8] border-[#d8be8a]',
          headerBorder: 'border-[#d8be8a]',
          glow: 'shadow-[0_0_20px_rgba(140,103,43,0.2)]',
        };
    }
  };

  const style = getIconAndStyle();

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs animate-fade-in font-serif text-[#2c241b]"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-md bg-[#fbf7ee] border-2 border-[#8c672b] rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-scale-up ${style.glow}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ornate Gold Header Bar */}
        <div className="bg-[#140e08] text-[#e8c37d] px-5 py-3.5 border-b-2 border-[#8c672b] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className={`p-1.5 rounded-lg border ${style.iconBg}`}>
              {style.icon}
            </div>
            <div>
              <h3 className="font-fantasy font-bold text-sm text-[#f5ede0] uppercase tracking-wider">
                {title}
              </h3>
              {subtitle && (
                <p className="text-[10px] text-[#bda994] font-mono leading-tight">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 text-[#baa892] hover:text-white hover:bg-[#8c2e28] rounded-lg transition cursor-pointer"
            title="Cerrar aviso"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-3.5 bg-[#fbf7ee]">
          <div className="p-3.5 bg-[#f5ede0] rounded-xl border border-[#ebdcc7] text-xs text-[#5c4a35] leading-relaxed shadow-inner">
            {typeof message === 'string' ? (
              <p className="whitespace-pre-line">{message}</p>
            ) : (
              message
            )}
          </div>

          {extraContent && (
            <div className="pt-1">
              {extraContent}
            </div>
          )}
        </div>

        {/* Actions Footer */}
        <div className="p-4 bg-[#f4ecd8] border-t border-[#d8be8a] flex items-center justify-end gap-2.5">
          {cancelText && (
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#ede1ce] hover:bg-[#dfd0ba] text-[#6e5c4a] hover:text-[#2c221a] text-xs font-fantasy font-bold rounded-xl border border-[#cfbe9f] transition cursor-pointer"
            >
              {cancelText}
            </button>
          )}

          <button
            type="button"
            onClick={handleConfirm}
            className="px-5 py-2 bg-gradient-to-r from-[#b88c32] to-[#8c672b] hover:from-[#cfa344] hover:to-[#a67a33] text-white text-xs font-fantasy font-bold rounded-xl shadow-md transition flex items-center gap-1.5 cursor-pointer ring-2 ring-[#ffd56b]/40"
          >
            <span>{confirmText}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
