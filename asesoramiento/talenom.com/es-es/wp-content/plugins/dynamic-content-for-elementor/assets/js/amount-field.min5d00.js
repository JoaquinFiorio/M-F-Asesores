"use strict";window.dceAmountField={refresherGenerators:{}};dceAmountField.registerRefresherGenerator=function(fieldIndex,refresherGenerator){this.refresherGenerators[fieldIndex]=refresherGenerator}
dceAmountField.getFieldValue=(form,id)=>{let data=new FormData(form);let key=`form_fields[${id}]`;if(data.has(key)){return data.get(key)}
key=`form_fields[${id}][]`
if(data.has(key)){return data.getAll(key)}
return""}
dceAmountField.makeGetFieldFunction=(form)=>{return(id)=>{let val=dceAmountField.getFieldValue(form,id);if(Array.isArray(val)){if(!val.length){return 0}
val=val.map((v)=>{let r=parseFloat(v);return isNaN(r)?0:r});return val.reduce((a,b)=>a+b)}
let r=parseFloat(val);return isNaN(r)?0:r}}
function initializeAmountField(wrapper,widget){let hiddenInput=wrapper.getElementsByClassName('dce-amount-hidden')[0];let visibleInput=wrapper.getElementsByClassName('dce-amount-visible')[0];let form=widget.getElementsByTagName('form')[0];let fieldIndex=hiddenInput.dataset.fieldIndex;let textBefore=hiddenInput.dataset.textBefore;let textAfter=hiddenInput.dataset.textAfter;let shouldRound=hiddenInput.dataset.shouldRound;let shouldFormat=hiddenInput.dataset.shouldFormat==='yes';let formatPrecision=hiddenInput.dataset.formatPrecision;let roundPrecision=hiddenInput.dataset.roundPrecision;let refreshOn=hiddenInput.dataset.refreshOn;let realTime=hiddenInput.dataset.realTime==='yes';if(hiddenInput.dataset.hide=='yes'){wrapper.style.display="none"}
let refresherGenerator=dceAmountField.refresherGenerators[fieldIndex];if(!refresherGenerator){visibleInput.value=amountFieldLocale.syntaxError;return}
let refresher=refresherGenerator(dceAmountField.makeGetFieldFunction(form));let onChange=()=>{let result=refresher();if(shouldRound==='yes'){result=Number(result).toFixed(roundPrecision)}
if(hiddenInput.value===result){return}
let dispResult=shouldFormat?Number(result).toLocaleString(undefined,{minimumFractionDigits:formatPrecision,maximumFractionDigits:formatPrecision}):result;hiddenInput.value=result;visibleInput.value=textBefore+dispResult+textAfter;if("createEvent" in document){var evt=document.createEvent("HTMLEvents");evt.initEvent("change",!1,!0);hiddenInput.dispatchEvent(evt)}else{hiddenInput.fireEvent("onchange")}}
onChange();form.addEventListener(refreshOn,onChange)}
function initializeAllAmountFields($scope){$scope.find('.elementor-field-type-amount').each((_,w)=>initializeAmountField(w,$scope[0]))}
jQuery(window).on('elementor/frontend/init',function(){if(elementorFrontend.isEditMode()){return}
elementorFrontend.hooks.addAction('frontend/element_ready/form.default',initializeAllAmountFields)})