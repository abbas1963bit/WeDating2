import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const LangContext = createContext(null);
const rtlLanguages = ['ar', 'fa', 'ur', 'he'];

