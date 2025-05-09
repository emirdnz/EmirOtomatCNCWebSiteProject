import React, { useState, useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { BsCalendar, BsCheckCircle, BsXCircle } from 'react-icons/bs';
import DatePicker, { registerLocale } from "react-datepicker";
import tr from 'date-fns/locale/tr';
import "react-datepicker/dist/react-datepicker.css";
import '../styles/animations.css'; 
import OrderSummaryModal from '../components/OrderSummaryModal';
import { API_URL } from '../config/api';

// Türkçe lokalizasyonu kaydet
registerLocale('tr', tr);

// Sabitler
const MATERIALS = [
  { value: "", label: 'uploadModel.material' },
  { value: "alüminyum", label: 'uploadModel.aluminum' },
  { value: "paslanmaz", label: 'uploadModel.stainless' },
  { value: "derlin", label: 'uploadModel.derlin' },
  { value: "otomat", label: 'uploadModel.otomat' },
  { value: "pirinç", label: 'uploadModel.brass' },
  { value: "özel", label: 'uploadModel.custom' }
];

const INITIAL_CUSTOMER_STATE = {
  name: '',
  title: '',
  company: '',
  phone: '',
  email: '',
  address: '',
};

// Yardımcı Fonksiyonlar
const formatDate = {
  toDisplay: (date) => {
    if (!date) return '';
    try {
      const d = date.includes('.') ? date.split('.').reverse().join('-') : date;
      return new Date(d).toLocaleDateString('tr-TR');
    } catch {
      return date;
    }
  },
  toInput: (date) => {
    if (!date) return '';
    try {
      const [day, month, year] = date.split('.');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    } catch {
      return '';
    }
  }
};

const formatQuantity = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const validateEmail = (email) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);

// Bildirim Bileşeni
const Notification = ({ type, message }) => (
  <div className={`notification ${type}`}>
    {type === 'success' ? <BsCheckCircle size={24} /> : <BsXCircle size={24} />}
    <span>{message}</span>
  </div>
);

// Ana Bileşen
const UploadModel = () => {
  // State tanımlamaları
  const [customer, setCustomer] = useState(INITIAL_CUSTOMER_STATE);
  const [files, setFiles] = useState([]);
  const [selectedFileId, setSelectedFileId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showCustomerError, setShowCustomerError] = useState(false);
  const [customerModal, setCustomerModal] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [notification, setNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { t, i18n } = useTranslation();
  const dateInputRef = useRef();

  // Memoize edilmiş değerler
  const selectedFile = useMemo(() => files.find(f => f.id === selectedFileId), [files, selectedFileId]);
  const isCustomerInfoComplete = useMemo(() => Object.values(customer).every(v => v.trim()), [customer]);
  const areFileDetailsComplete = useMemo(() => files.length > 0 && files.every(f => f.quantity && f.material), [files]);

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;

    if (name === 'email') {
      const isValidEmail = validateEmail(value);
      e.target.style.borderColor = isValidEmail ? '#ccc' : '#ff4444';
    }

    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const validateCustomerDetails = () => {
    if (!customer.email.trim() || !validateEmail(customer.email)) {
      setShowCustomerError(true);
      setTimeout(() => setShowCustomerError(false), 3000);
      return false;
    }

    const hasEmptyFields = Object.values(customer).some(value => !value.trim());
    if (hasEmptyFields) {
      setShowCustomerError(true);
      setTimeout(() => setShowCustomerError(false), 3000);
      return false;
    }

    return true;
  };

  const handleCustomerSave = () => {
    const isValid = validateCustomerDetails();
    if (!isValid) {
      setShowCustomerError(true);
      setTimeout(() => setShowCustomerError(false), 3000);
      return;
    }
    setCustomerModal(false);
    setShowCustomerError(false);
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files).map((file) => ({
      id: `${file.name}_${Date.now()}`,
      name: file.name,
      originalFile: file,
      quantity: '',
      material: '',
      deliveryDate: '',
      note: '',
    }));
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    e.target.value = '';
  };

  const handleFileDetailChange = (id, key, value) => {
    if (key === 'quantity') {
      const numericValue = value.replace(/[^0-9]/g, '');
      const formattedValue = formatQuantity(numericValue);
      setFiles(prev =>
        prev.map(file => (file.id === id ? { ...file, [key]: formattedValue } : file))
      );
    } else {
      setFiles(prev =>
        prev.map(file => (file.id === id ? { ...file, [key]: value } : file))
      );
    }
  };

  const validateFileDetails = () => {
    if (!selectedFile) return false;

    const requiredFields = {
      quantity: selectedFile.quantity,
      material: selectedFile.material,
      deliveryDate: selectedFile.deliveryDate
    };

    const hasMissingFields = Object.values(requiredFields).some(value => !value);

    if (hasMissingFields) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return false;
    }

    if (selectedFile.material === 'özel' && !selectedFile.customMaterial) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return false;
    }

    return true;
  };

  const handleSubmitAll = async () => {
    if (!isCustomerInfoComplete) {
      alert(t("uploadModel.fillCustomerInfo"));
      return;
    }

    if (!areFileDetailsComplete) {
      alert(t("uploadModel.fillFileDetails"));
      return;
    }

    setShowSummaryModal(true);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();

      formData.append('customer', JSON.stringify(customer));
      formData.append('fileDetails', JSON.stringify(files));
      formData.append('language', i18n.language);

      files.forEach(file => {
        if (file.originalFile) {
          formData.append('files', file.originalFile);
        }
      });

      const response = await fetch(`${API_URL}/send-mail`, {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (!response.ok) {
        // Sunucu hatası için özel mesaj
        throw new Error(
          i18n.language === 'tr'
            ? (result.error || 'Sunucuda bir problem oluştu. Ekiplerimize bildirildi.')
            : (result.error || 'A server error occurred. Our team has been notified.')
        );
      }

      setNotification({
        type: 'success',
        message:
          i18n.language === 'tr'
            ? 'Siparişiniz başarıyla alındı.'
            : 'Your order has been received successfully.'
      });

      setFiles([]);
      setCustomer(INITIAL_CUSTOMER_STATE);

    } catch (error) {
      setNotification({
        type: 'error',
        message: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmOrder = async () => {
    try {
      setIsLoading(true);
      await handleSubmit();
      setShowSummaryModal(false);
    } catch (error) {
      console.error("Order confirmation error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (fileId) => {
    setSelectedFileId(fileId);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    const isValid = validateFileDetails();
    if (!isValid) return;

    setIsModalVisible(false);
    setSelectedFileId(null);
    setShowError(false);
  };

  const handleRemoveFile = (fileId) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
  };

  const isSendButtonDisabled =
    !isCustomerInfoComplete || !areFileDetailsComplete || files.length === 0;

  return (
    <>
      <div
        style={{
          padding: '40px 0',
          fontFamily: 'Segoe UI, Arial, sans-serif',
          textAlign: 'center',
          minHeight: '60vh',
          background: '#f4f6fa',
        }}
      >
        <div style={{
          width: '100%',
          maxWidth: 480,
          margin: '0 auto',
          border: '2px dashed #007bff',
          borderRadius: '12px',
          padding: '28px 18px 18px 18px',
          background: '#fff',
          boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
        }}>
          <h3 style={{ margin: 0, fontSize: 19, color: '#222', fontWeight: 600 }}>
            {t('uploadModel.uploadTitle')}
          </h3>
          <p style={{ margin: '10px 0 18px', fontSize: 14, color: '#555' }}>
            {t('uploadModel.supported')}{' '}
            <b>{t('uploadModel.fileTypes')}</b>
          </p>
          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            accept=".pdf,.png,.jpg,.jpeg,.dwg,.dxf,.sldprt,.sldasm,.slddrw,.eprt,.easm,.edrw"
            multiple
            style={{ display: 'none' }}
          />
          <label
            htmlFor="fileInput"
            style={{
              padding: '10px 22px',
              background: '#007bff',
              color: '#fff',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '15px',
              fontWeight: 500,
              marginBottom: 18,
              display: 'inline-block',
            }}
          >
            {t('uploadModel.uploadBtn')}
          </label>
          <div style={{ width: '100%', marginTop: 10 }}>
            {files.map((file) => (
              <div
                key={file.id}
                style={{
                  marginTop: 12,
                  display: 'flex',
                  alignItems: 'center',
                  background: '#f7fafd',
                  padding: '10px 12px',
                  borderRadius: '7px',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                  justifyContent: 'space-between',
                  fontSize: 14,
                }}
              >
                <span style={{ flex: 1, textAlign: 'left', color: '#222' }}>{file.name}</span>
                <button
                  onClick={() => handleOpenModal(file.id)}
                  style={{
                    marginLeft: 8,
                    padding: '5px 10px',
                    background: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '13px',
                  }}
                >
                  {t('uploadModel.fileDetails')}
                </button>
                <button
                  onClick={() => handleRemoveFile(file.id)}
                  style={{
                    marginLeft: 8,
                    padding: '5px 10px',
                    background: '#dc3545',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '13px',
                  }}
                >
                  {t('uploadModel.remove')}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 16,
          marginTop: 32,
        }}>
          <button
            onClick={() => setCustomerModal(true)}
            disabled={files.length === 0}
            style={{
              padding: '8px 18px',
              background: files.length === 0 ? '#b3d7ff' : '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              fontWeight: 500,
              fontSize: 15,
              cursor: files.length === 0 ? 'not-allowed' : 'pointer',
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
              transition: 'background 0.2s',
            }}
          >
            {t('uploadModel.customerBtn')}
          </button>
          <button
            disabled={isSendButtonDisabled}
            style={{
              padding: "8px 22px",
              background: isSendButtonDisabled ? "#a5d6b5" : "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: isSendButtonDisabled ? "not-allowed" : "pointer",
              fontSize: "15px",
              fontWeight: 500,
              minWidth: 180,
              transition: "background 0.2s",
            }}
            onClick={handleSubmitAll}
          >
            {t("uploadModel.summarizeAll")}
          </button>
        </div>

        {/* Modals */}
        {customerModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}>
            <div style={{
              background: '#fff',
              padding: 28,
              borderRadius: 10,
              width: 340,
              boxShadow: '0 2px 16px rgba(0,0,0,0.13)',
              position: 'relative'
            }}>
              <h3 style={{ margin: 0, fontSize: 18, marginBottom: 18 }}>
                {t('uploadModel.customerTitle')}
              </h3>
              
              {/* Error Message */}
              {showCustomerError && (
                <div
                  style={{
                    position: 'absolute',
                    top: -45,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#fff',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    border: '1px solid #ff4444',
                    color: '#ff4444',
                    fontSize: '14px',
                    whiteSpace: 'nowrap',
                    animation: 'slideDown 0.3s ease-out',
                    zIndex: 1100
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    bottom: -5,
                    left: '50%',
                    transform: 'translateX(-50%) rotate(45deg)',
                    width: 10,
                    height: 10,
                    backgroundColor: '#fff',
                    border: '1px solid #ff4444',
                    borderTop: 'none',
                    borderLeft: 'none'
                  }} />
                  {t('uploadModel.requiredFields')}
                </div>
              )}

              {/* Form Fields */}
              {[
                { name: 'name', type: 'text', required: true },
                { name: 'title', type: 'text', required: true },
                { name: 'company', type: 'text', required: true },
                { name: 'phone', type: 'tel', required: true },
                { 
                  name: 'email', 
                  type: 'email', 
                  required: true,
                  pattern: "[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}",
                  title: t('uploadModel.validEmail')
                },
                { name: 'address', type: 'text', required: true }
              ].map((field) => (
                <div key={field.name} style={{ 
                  position: 'relative', 
                  marginBottom: 15,
                  width: '100%'
                }}>
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    position: 'relative'
                  }}>
                    <input
                      type={field.type}
                      name={field.name}
                      placeholder={t(`uploadModel.${field.name}`)}
                      value={customer[field.name] || ''}
                      onChange={handleCustomerChange}
                      required={field.required}
                      pattern={field.pattern}
                      title={field.title}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '5px',
                        border: `1px solid ${
                          field.required && !customer[field.name] ? '#ff4444' : 
                          field.name === 'email' && customer[field.name] && !validateEmail(customer[field.name]) ? '#ff4444' : 
                          '#ccc'
                        }`,
                        fontSize: '14px',
                        transition: 'border-color 0.2s'
                      }}
                    />
                    {field.name === 'email' && customer[field.name] && !validateEmail(customer[field.name]) && (
                      <div style={{
                        position: 'absolute',
                        right: -160,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#ff4444',
                        fontSize: '13px',
                        whiteSpace: 'nowrap',
                        backgroundColor: '#fff',
                        padding: '6px 12px',
                        borderRadius: '4px',
                        border: '1px solid #ff4444',
                        boxShadow: '0 2px 4px rgba(255,68,68,0.1)',
                        animation: 'slideIn 0.2s ease-out'
                      }}>
                        {t('uploadModel.validEmail')}
                        <div style={{
                          position: 'absolute',
                          left: -5,
                          top: '50%',
                          transform: 'translateY(-50%) rotate(45deg)',
                          width: 8,
                          height: 8,
                          backgroundColor: '#fff',
                          border: '1px solid #ff4444',
                          borderRight: 'none',
                          borderBottom: 'none'
                        }} />
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Buttons */}
              <div style={{ 
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 10,
                marginTop: 20
              }}>
                <button
                  onClick={() => {
                    setCustomerModal(false);
                    setShowCustomerError(false);
                  }}
                  style={{
                    padding: '7px 16px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    background: '#fff',
                    color: '#666',
                    fontWeight: 500,
                    fontSize: 14,
                  }}
                >
                  {t('uploadModel.cancel')}
                </button>
                <button
                  onClick={handleCustomerSave}
                  style={{
                    padding: '7px 16px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    background: '#007bff',
                    color: '#fff',
                    fontWeight: 500,
                    fontSize: 14,
                  }}
                >
                  {t('uploadModel.save')}
                </button>
              </div>
            </div>
          </div>
        )}

        {isModalVisible && selectedFile && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}>
            <div style={{
              background: '#fff',
              padding: 28,
              borderRadius: 10,
              width: 340,
              boxShadow: '0 2px 16px rgba(0,0,0,0.13)',
              position: 'relative'
            }}>
              {showError && (
                <div
                  style={{
                    position: 'absolute',
                    top: -45,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#fff',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    border: '1px solid #ff4444',
                    color: '#ff4444',
                    fontSize: '14px',
                    whiteSpace: 'nowrap',
                    animation: 'slideDown 0.3s ease-out forwards',
                    zIndex: 1100
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    bottom: -5,
                    left: '50%',
                    transform: 'translateX(-50%) rotate(45deg)',
                    width: 10,
                    height: 10,
                    backgroundColor: '#fff',
                    border: '1px solid #ff4444',
                    borderTop: 'none',
                    borderLeft: 'none'
                  }} />
                  {t('uploadModel.requiredFields')}
                </div>
              )}
              <h3 style={{ margin: 0, fontSize: 18, marginBottom: 18 }}>
                {t('uploadModel.orderDetails')} – {selectedFile.name}
              </h3>
              <input
                type="text" // number yerine text kullan
                name="quantity"
                placeholder={`${t('uploadModel.quantity')} *`}
                value={selectedFile.quantity || ''}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, ''); // Sadece sayılara izin ver
                  if (value) {
                    const numValue = parseInt(value);
                    if (numValue >= 1) {
                      handleFileDetailChange(selectedFile.id, 'quantity', value);
                    }
                  } else {
                    handleFileDetailChange(selectedFile.id, 'quantity', '');
                  }
                }}
                required
                style={{
                  width: '100%',
                  marginBottom: 10,
                  padding: '8px',
                  borderRadius: '5px',
                  border: `1px solid ${!selectedFile.quantity ? '#ff4444' : '#ccc'}`,
                }}
              />
              <select
                name="material"
                value={selectedFile.material || ''}
                onChange={(e) => handleFileDetailChange(selectedFile.id, 'material', e.target.value)}
                required
                style={{
                  width: '100%',
                  marginBottom: 10,
                  padding: '8px',
                  borderRadius: '5px',
                  border: `1px solid ${!selectedFile.material ? '#ff4444' : '#ccc'}`,
                }}
              >
                {MATERIALS.map((material) => (
                  <option key={material.value} value={material.value}>
                    {t(material.label)}
                  </option>
                ))}
              </select>
              
              {selectedFile.material === 'özel' && (
                <input
                  type="text"
                  name="customMaterial"
                  placeholder={t('uploadModel.customMaterial')}
                  value={selectedFile.customMaterial || ''}
                  onChange={(e) => handleFileDetailChange(selectedFile.id, 'customMaterial', e.target.value)}
                  style={{
                    width: '100%',
                    marginBottom: 10,
                    padding: '8px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                  }}
                />
              )}
              
              <div className="date-picker-wrapper" style={{ position: 'relative', width: '100%', marginBottom: 10 }}>
                <DatePicker
                  selected={selectedFile.deliveryDate ? new Date(formatDate.toInput(selectedFile.deliveryDate)) : null}
                  onChange={(date) => {
                    handleFileDetailChange(
                      selectedFile.id,
                      'deliveryDate',
                      date ? date.toLocaleDateString('tr-TR') : ''
                    );
                  }}
                  locale="tr"
                  dateFormat="dd.MM.yyyy"
                  placeholderText={t('uploadModel.deliveryDate')}
                  customInput={
                    <div style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '5px',
                      border: `1px solid ${!selectedFile.deliveryDate ? '#ff4444' : '#ccc'}`,
                      backgroundColor: '#fff',
                      fontSize: '14px',
                      height: '35px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      position: 'relative',
                      boxSizing: 'border-box'
                    }}>
                      <span style={{ 
                        flex: 1,
                        textAlign: 'left',
                        paddingRight: '30px',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis'
                      }}>
                        {selectedFile.deliveryDate || t('uploadModel.deliveryDate')}
                      </span>
                      <BsCalendar style={{ 
                        position: 'absolute',
                        right: 12,
                        color: '#666',
                        fontSize: 20,
                        top: '50%',
                        transform: 'translateY(-50%)'
                      }} />
                    </div>
                  }
                  style={{ width: '100%' }}
                />
              </div>
              
              <textarea
                name="note"
                placeholder={t('uploadModel.note')}
                value={selectedFile.note || ''}
                onChange={(e) => handleFileDetailChange(selectedFile.id, 'note', e.target.value)}
                style={{
                  width: '100%',
                  marginBottom: 10,
                  padding: '8px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  minHeight: 60,
                }}
              />
              
              <div style={{ 
                textAlign: 'right',
                marginTop: 20,
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 10
              }}>
                <button
                  onClick={() => {
                    setIsModalVisible(false);
                    setSelectedFileId(null);
                    setShowError(false);
                  }}
                  style={{
                    padding: '7px 16px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    background: '#fff',
                    color: '#666',
                    fontWeight: 500,
                    fontSize: 14,
                  }}
                >
                  {t('uploadModel.cancel')}
                </button>
                <button
                  onClick={handleCloseModal}
                  style={{
                    padding: '7px 16px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    background: '#007bff',
                    color: '#fff',
                    fontWeight: 500,
                    fontSize: 14,
                  }}
                >
                  {t('uploadModel.save')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {notification && (
        <div
          className={`notification ${notification.type}`}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '16px 24px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            animation: 'notificationSlideIn 0.3s ease-out',
            zIndex: 9999,
            backgroundColor: notification.type === 'success' ? '#34c759' : '#ff3b30',
            color: 'white',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}
        >
          {notification.type === 'success' ? (
            <BsCheckCircle size={24} />
          ) : (
            <BsXCircle size={24} />
          )}
          <span style={{ fontSize: '15px', fontWeight: 500 }}>
            {notification.message}
          </span>
        </div>
      )}

      <OrderSummaryModal
        isOpen={showSummaryModal}
        onClose={() => setShowSummaryModal(false)}
        onConfirm={handleConfirmOrder}
        customer={customer}
        files={files}
      />
    </>
  );
}

export default UploadModel;