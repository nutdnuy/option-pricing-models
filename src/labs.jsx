import React from 'react';
import {createRoot} from 'react-dom/client';
import {OptionModelLab} from './option-lab.jsx';
const target=document.getElementById('option-model-lab');
if(target) createRoot(target).render(<OptionModelLab/>);

import {PayoffLab,DistributionLab,TreeLab,ConvergenceLab} from './interactive-viz.jsx';
const PayoffLabTarget=document.getElementById('payoff-lab');
if(PayoffLabTarget)createRoot(PayoffLabTarget).render(<PayoffLab/>);
const DistributionLabTarget=document.getElementById('distribution-lab');
if(DistributionLabTarget)createRoot(DistributionLabTarget).render(<DistributionLab/>);
const TreeLabTarget=document.getElementById('tree-lab');
if(TreeLabTarget)createRoot(TreeLabTarget).render(<TreeLab/>);
const ConvergenceLabTarget=document.getElementById('convergence-lab');
if(ConvergenceLabTarget)createRoot(ConvergenceLabTarget).render(<ConvergenceLab/>);
