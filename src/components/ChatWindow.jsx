import React, { useEffect, useState} from 'react';
import './ChatWindow.css';
import { BsCameraVideoFill, BsPhone, BsFillMicFill, BsImageFill, BsEmojiSmile, BsTrash } from 'react-icons/bs';
import Recorder from 'recorder-js';
import emojisData from './emojisData'; // Import emojis data

// Dummy data for messages
const dummyMessages = {
  1: [
    { id: 1, content: "Message 1 from Chat 1", time: "10:01 AM", type: 'received' },
    { id: 2, content: "Message 2 from Chat 1", time: "10:02 AM", type: 'sent' }
  ],
  2: [
    { id: 1, content: "Message 1 from Chat 2", time: "10:31 AM", type: 'received' },
    { id: 2, content: "Message 2 from Chat 2", time: "10:32 AM", type: 'sent' }
  ],
  3: [
    { id: 1, content: "Message 1 from Chat 3", time: "11:01 AM", type: 'received' },
    { id: 2, content: "Message 2 from Chat 3", time: "11:02 AM", type: 'sent' }
  ]
};

const ChatWindow = ({ chatId, chatName }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [recorder, setRecorder] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      if (chatId) {
        try {
          setMessages(dummyMessages[chatId] || []);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
    };
    fetchMessages();
  }, [chatId]);

  useEffect(() => {
    const initRecorder = async () => {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const recorder = new Recorder(audioContext, {
        onAnalysed: (data) => console.log(data)
      });
      setRecorder(recorder);
    };
    initRecorder();
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const newMessageObj = {
        id: messages.length + 1,
        content: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'sent'
      };
      setMessages([...messages, newMessageObj]);
      setNewMessage('');
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleSendImage = () => {
    if (selectedImage) {
      const newMessageObj = {
        id: messages.length + 1,
        content: selectedImage.name,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'sent',
        image: URL.createObjectURL(selectedImage)
      };
      setMessages([...messages, newMessageObj]);
      setSelectedImage(null);
    }
  };

  const handleDeleteImage = (messageId) => {
    const updatedMessages = messages.filter(message => message.id !== messageId);
    setMessages(updatedMessages);
  };

  const handleDeleteAudio = (messageId) => {
    const updatedMessages = messages.filter(message => message.id !== messageId);
    setMessages(updatedMessages);
  };

  const handleEmojiSelect = (emoji) => {
    setNewMessage(prevMessage => prevMessage + emoji);
    setShowEmojiPicker(false);
  };

  const startRecording = async () => {
    if (recorder) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        recorder.init(stream);
        recorder.start();
        setIsRecording(true);
      } catch (error) {
        console.error('Error accessing microphone', error);
      }
    }
  };

  const stopRecording = async () => {
    if (recorder && isRecording) {
      try {
        const { blob } = await recorder.stop();
        const newMessageObj = {
          id: messages.length + 1,
          content: 'Voice Message',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'sent',
          audio: URL.createObjectURL(blob)
        };
        setMessages([...messages, newMessageObj]);
        setIsRecording(false);
      } catch (error) {
        console.error('Error stopping recording', error);
      }
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <div className="left-content">
          <div className="selected-chat">
            <div className="profile-photo" style={{ backgroundColor: "#ffcc80" }}>{chatName && chatName[0]}</div>
            <div className="chat-name">{chatName || 'Select a chat'}</div>
          </div>
        </div>
        <div className="right-content">
          <button className="call-button"><BsCameraVideoFill /></button> {/* Video call icon */}
          <button className="call-button"><BsPhone /></button> {/* Phone call icon */}
        </div>
      </div>
      <div className="chat-messages">
        {messages.length > 0 ? (
          messages.map(message => (
            <div key={message.id} className={message.type === 'sent' ? 'message-sent' : 'message-received'}>
              <div className="message-content">
                {message.content}
                {message.audio && (
                  <div className="sent-image-container">
                    <audio controls>
                      <source src={message.audio} type="audio/wav" />
                      Your browser does not support the audio element.
                    </audio>
                    <BsTrash className="delete-icon" onClick={() => handleDeleteAudio(message.id)} />
                  </div>
                )}
                {message.image && (
                  <div className="sent-image-container">
                    <img src={message.image} alt="Sent Image" className="sent-image" />
                    <BsTrash className="delete-icon" onClick={() => handleDeleteImage(message.id)} />
                  </div>
                )}
                <div className="message-time">{message.time}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-messages">No messages to display</div>
        )}
      </div>
      <div className="new-message-container">
        <div className="input-icons">
          <BsFillMicFill
            className="icon"
            onMouseDown={startRecording}
            onMouseUp={stopRecording}
          /> {/* Voice recorder icon */}
          <BsImageFill className="icon" onClick={() => document.getElementById('fileInput').click()} /> {/* Gallery icon */}
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageSelect}
          />
          <BsEmojiSmile className="icon" onClick={() => setShowEmojiPicker(prev => !prev)} /> {/* Emoji picker icon */}
        </div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a new message..."
        />
        <button className="send-button" onClick={handleSendMessage}>Send</button>
        {selectedImage && (
          <button className="send-button" onClick={handleSendImage}>Send Image</button>
        )}
      </div>
      {showEmojiPicker && (
        <div className="emoji-picker">
          {emojisData.map(category => (
            <div key={category.category} className="emoji-category">
              <div className="category-title">{category.category}</div>
              <div className="emoji-list">
                {category.emojis.map(emoji => (
                  <span key={emoji} className="emoji" onClick={() => handleEmojiSelect(emoji)}>
                    {emoji}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
