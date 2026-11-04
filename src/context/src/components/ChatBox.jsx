import React, { useState, useRef, useEffect } from 'react';

const EMOJIS = ['😊', '❤️', '🔥', '😍', '👍', '🌹', '✨', '☕'];

export function ChatBox({ recipient, messages = [], onSendMessage }) {
