// ==UserScript==
// @name BeOn Stickers Arisha
// @namespace http://beonsmilepanel.beon.ru
// @version 1.1
// @source
// @author  gh0strider, Dikey, Uporkamur
// @description скрипт, добавляющий стикеры на beon.ru
// @match        *://*.beon.ru/*
// @grant       none
//            _,'|             _.-''``-...___..--';)
//           /_ \'.      __..-' ,      ,--...--'''
//          <\    .`--'''       `     /'
//           `-';'               ;   ; ;
//     __...--''     ___...--_..'  .;.'
//    (,__....----'''       (,..--''
// ==/UserScript==


var smileboxelement, toolbar, pmtoolbar, newElement, newsheet, context, insertcode, insertbutton, stringstart, idformlength, formnum1, formnum2, context1, context2;
var smilelist, blockstart, blockend, smilefolder, smileextens;

smileboxelement = document.querySelector('td.smiles_box'); //поиск строки стд смайлов
//smileboxelement.style.display = 'none'; //убрать две косых черты в начале этой строки чтобы скрыть стандартные смайлики

newsheet = document.createElement('style'); // стили смайл-кнопки и меню
newsheet.innerHTML ='.dropdown {'+
    'position: relative;'+
    'display: inline;'+
    '}'+
    '.dropbtn {'+
    'border-radius: 10px;'+
    'background-color: #4CAF50;'+
    'color: white;'+
    'padding: 3px;'+
    'font-size: 16px;'+
    'border: none;'+
    'cursor: pointer;'+
'}'+
'.dropdown-content {'+
    'display: none;'+
    'position: absolute;'+
    'top: 4px;'+
    'align: left;'+
    'background-color: #f9f9f9;'+
    'width: 50vw;'+
    'min-width: 250px'+
    'box-shadow:8px 8px 8px 8px rgba(0,0,0,0.2);'+
'}'+
'.dropdown-content a {'+
    'color: black;'+
    'padding: 2px;'+
    'text-decoration: none;'+
    'display: inline;'+
'}'+
'.dropdown-content a:hover {'+
    'background-color: #f1f1f1;'+
    '}'+
'.dropdown:hover .dropdown-content {'+
    'display: block;'+
'}'+
'.dropdown:hover .dropbtn {'+
    'background-color: #3e8e41;'+
'}'+
document.body.appendChild(newsheet);

idformlength = window.document.forms.length; //считаем количество форм
formnum1 = idformlength - 2 ; //находим номер предпоследней
formnum2 = idformlength - 1 ; //находим номер последней
context1 = window.document.forms[formnum1].id; //ид предпоследней формы
context2 = window.document.forms[formnum2].id; //ид последней формы
if (context1 == 'topic_form' && context2 == 'comment_form') {
  context = window.document.forms[formnum1].id;
} else {
  context = window.document.forms[formnum2].id;
}//или имя последней или предпоследняя, чтобы работало в "своем дневнике"

window.addSmile();

toolbar = document.querySelector(".toolbar"); // поиск блока стандартных кнопок
pmtoolbar = document.querySelector(".pmtoolbar");

stringstart = '<a href="javascript:addSmile(\'' + context + '\',\'[image-original-none-'; //начало строки

smilefolder = 'http://vk.com/images/stickers/'; //ссылка на папку со смайлами
//начало блока кнопочек

smilelist = "";

blockstart = '<table border=0 cellpadding=7 cellspacing=0 width=100%><td class=kolobok_box> <td>';
blockend = '</td></table>';

smilearray = ['4132','4133','4134','4135','4136','4137','4138','4139','4140','4141','4142','4143','4144','4145','4146','4147','4148','4149','4150','4151','4152','4153','4154','4155','4156','4157','4158','4159','4160','4161','4162','4163','4164','4165','4166','4167','4168','4169','4170','4171'];
smilesize = 64;
smileextens = 'png';

smilearray.forEach(function(item){
    smilelist = smilelist + stringstart + smilefolder + item + '/' + smilesize + '.' + smileextens + '] \');"><img src=' + smilefolder + item + '/' + smilesize + '.' + smileextens + ' alt="' + item + '" title="' + item + '" ></a> ' ;
}) ;

insertcode = blockstart + smilelist + blockend;

insertbutton = '<button class="dropbtn"><img src=https://vk.com/images/stickers/4132/64.png width="20" height="20"></button>'+
    '<div class="dropdown-content">'+
    ' ' + insertcode + ' '+
'</div>'; // кнопка выпадающего меню

if (toolbar) {
    newElement = document.createElement('div');
    newElement.className = 'dropdown';
    newElement.innerHTML = insertbutton;
    toolbar.parentNode.insertBefore(newElement, toolbar.nextSibling);
} else if (pmtoolbar) {
    newElement = document.createElement('div');
    newElement.className = 'dropdown';
    newElement.innerHTML = insertbutton;
    pmtoolbar.parentNode.insertBefore(newElement, pmtoolbar.nextSibling);
} //вставляем блок с кнопками
//вставили кнопочку. Ура!