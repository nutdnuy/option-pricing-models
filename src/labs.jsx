import React from 'react';
import {createRoot} from 'react-dom/client';
import {OptionModelLab} from './option-lab.jsx';
const target=document.getElementById('option-model-lab');
if(target) createRoot(target).render(<OptionModelLab/>);
