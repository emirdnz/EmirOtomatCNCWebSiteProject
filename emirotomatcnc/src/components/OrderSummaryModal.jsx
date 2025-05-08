import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from "react-modal";
import '../styles/OrderSummaryModal.css';

Modal.setAppElement('#root');

export default function OrderSummaryModal({ isOpen, onClose, onConfirm, customer, files }) {
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [loadingText, setLoadingText] = useState('');

  useEffect(() => {
    setLoadingText(i18n.language === 'en' ? 'Sending...' : 'Gönderiliyor...');
  }, [i18n.language]);

  useEffect(() => {
    if (!isOpen) {
      setIsLoading(false);
      setNotification(null);
      setLoadingText('');
    }
  }, [isOpen]);

  const handleOrderConfirm = async () => {
    try {
      setIsLoading(true);
      setNotification(null);

      const formData = new FormData();
      formData.append('language', i18n.language);

      const hasFiles = files.some(file => file.originalFile);
      if (!hasFiles) {
        throw new Error(t('uploadModel.noFiles'));
      }

      await onConfirm();
      
      setNotification({
        type: 'success',
        message: t('uploadModel.orderSuccess')
      });

      setTimeout(() => {
        onClose();
      }, 2000);

    } catch (error) {
      console.error("Order confirmation error:", error);
      setNotification({
        type: 'error',
        message: error.message || t('uploadModel.orderError')
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderNotification = () => {
    if (!notification) return null;

    return (
      <div className={`notification ${notification.type}`}>
        <span className="notification-message">{notification.message}</span>
      </div>
    );
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onClose}
      className="order-summary-modal"
      overlayClassName="order-summary-overlay"
    >
      {renderNotification()}
      
      <h2>{t('uploadModel.orderSummaryTitle')}</h2>
      
      <div className="summary-section">
        <h3>{t('uploadModel.customerInfo')}</h3>
        <div className="customer-details">
          <p><strong>{t('uploadModel.name')}:</strong> {customer.name}</p>
          <p><strong>{t('uploadModel.company')}:</strong> {customer.company}</p>
          <p><strong>{t('uploadModel.email')}:</strong> {customer.email}</p>
          <p><strong>{t('uploadModel.phone')}:</strong> {customer.phone}</p>
        </div>
      </div>

      <div className="summary-section">
        <h3>{t('uploadModel.orderDetails')}</h3>
        <div className="files-list">
          {files.map((file) => (
            <div key={file.id} className="file-item">
              <h4>{file.name}</h4>
              <div className="file-details">
                <p><strong>{t('uploadModel.quantity')}:</strong> {file.quantity}</p>
                <p><strong>{t('uploadModel.material')}:</strong> {file.material}</p>
                <p><strong>{t('uploadModel.deliveryDate')}:</strong> {file.deliveryDate}</p>
                {file.note && (
                  <p><strong>{t('uploadModel.note')}:</strong> {file.note}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="modal-actions">
        <button className="cancel-button" onClick={onClose}>
          {t('uploadModel.cancel')}
        </button>
        <button 
          className="confirm-button" 
          onClick={handleOrderConfirm}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="loading-spinner"></span>
              <span className="loading-text">{t('uploadModel.sending')}</span>
            </>
          ) : t('uploadModel.confirmOrder')}
        </button>
      </div>
    </Modal>
  );
}