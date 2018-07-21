<template>
  <div id="app" @click="mainHideElements();">
   	<!-- Desks -->
		<div class="desks">
			<!-- desk -->
			<draggable class="desks__inner">
				<div class="desk" v-for="(item, index) in desks">
					<!-- Menu with top-->
					<div class="desk__top">
						<textarea name="name" class="input_title" v-model="item.name" @keyup="setNameDesk(index);"></textarea>
						<button class="btn_desk_menu" @click.stop="desksMenuToggleShow(index);">
							<span></span>
						</button>
					</div>
					<div class="desk__menu" v-if="desksMenuBoolean[index]" @click.stop>
						<h3>Действия со списком</h3>
						<button class="close_btn" @click="deskMenuHide"><i class="fa fa-times" aria-hidden="true"></i></button>
						<ul>
							<li><button @click="addCardsToggleShow(index);">Добавить карточку...</button></li>
							<li><button @click="removeDesk(index);">Удалить Список...</button></li>
						</ul>
					</div>
					<!-- END Menu with top-->
					<!-- Cards -->
					<div class="cards">
						<draggable class="dragArea" :options="{group:'people'}">
							<div class="card" v-for="(item, cardIndex) in item.cards" @click="infoToPopup(item, index, cardIndex);">
								<span class="card__name">{{ item.cardName }}</span>
							</div>
						</draggable>
					</div>
					<!-- END Cards -->
					<!-- Add card -->
					<div class="desk__addСard" v-if="addCardsBoolean[index]" @click.stop="deskMenuHide">
						<textarea name="name" placeholder="Введите заголовок для этой карточки" v-model="addCardValue"></textarea>
						<div class="desk__addСard_bottom">
							<div class="desk__addСard_left">
								<button class="btn_addCard" @click="addCard(index);">Добавить карточку</button>
								<button class="close_btn" @click="$set(addCardsBoolean, index, false);"><i class="fa fa-times" aria-hidden="true"></i></button>
							</div>
							<div class="desk__addСard_right"></div>
						</div>
					</div>
					<button class="desk__btnAddСard" v-else @click.stop="addCardsToggleShow(index);"> 
						<i>+</i> 
						<span>Добавить карточку</span>
					</button>
					<!-- END Add card -->
				</div>
			</draggable>
			<!-- desk -->
			<!-- Btn Add desk -->
			<div class="wrp_add_desk">
				<button class="add_desk" v-if="addDeskBoolean" @click="addDeskBoolean = !addDeskBoolean"> 
					<i>+</i> 
					<span>{{ addDeskText }}</span>
				</button>
				<div class="desk__addСard" v-else>
					<textarea name="name" class="input_title" placeholder="Введите заголовок списка" v-model="addDeskValue"></textarea>
					<div class="desk__addСard_bottom">
						<div class="desk__addСard_left">
							<button class="btn_addCard" @click="addDesk">Добавить список</button>
							<button class="close_btn" @click="addDeskBoolean = !addDeskBoolean"><i class="fa fa-times" aria-hidden="true"></i></button>
						</div>
						<div class="desk__addСard_right"></div>
					</div>
				</div>
			</div>
			<!-- END Btn Add desk -->
		</div>
		<!-- END Desks -->
		<!-- Popup -->
		<div class="card_popup bounce" v-if="toggleShowPupup" @click="popupClickHideElements">
			<div class="card_popup__mask" @click="toggleShowPupup = false"></div>
			<div class="card_popup__content">
				<button class="card_popup__close" @click="toggleShowPupup = false"><i class="fa fa-times"></i></button>
				<div class="card_popup__item">
					<i class="fa fa-columns" aria-hidden="true"></i>
					<textarea name="name" class="input_title" v-model="pupupName" @keyup="cardEditName"></textarea>
				</div>
				<div class="card_popup__flexWrp">
					<!-- Left block -->
					<div class="card_popup__left">
						<!-- Description -->
						<div class="card_popup__item">
							<i class="fa fa-align-left" aria-hidden="true"></i>
							<div class="add_description">
								<h3 class="h3">Описание</h3>
								<div class="add_description_inner">
									<h3 class="description" v-if="popupDescriptionToggleShow" @click="description">{{ popupDescription }}</h3>
									<div class="add_description_form" v-else>
										<textarea name="description" placeholder="Добавить более подробное описание…" v-model="popupDescription"></textarea>
										<div class="desk__addСard_left">
											<button class="green_btn" @click="saveDescription">Сохранить</button> 
											<button class="close_btn" v-if ="pupupDescritpionBtnClose" @click="popupDescriptionToggleShow = true">
												<i aria-hidden="true" class="fa fa-times"></i>
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
						<!-- END Description -->
						<!-- CheckLists -->
						<draggable>
							<div class="card_popup__item" v-for="(item, index) in desks[currentDeskIndex].cards[currentCardIndex].checkLists">
								<i class="fa fa-check-square-o" aria-hidden="true"></i>
								<div class="check_list">
									<h3 class="h3">{{ item.name }}</h3>
									<!-- CheckBoxis -->
									<draggable>
										<label class="wrp_checkboxis" v-for="(checkbox, childIndex) in item.checkBoxis">
											<input type="checkbox" name="name" class="checkbox">
											<span class="wrp_custom_checkbox">
												<span class="checkbox_custom"></span>
												<span class="checkbox_name">{{ checkbox.name }}</span>
											</span>
											<button class="remove_checkbox" title="Удалить" @click="checkBoxRemove(index, childIndex);"><i class="fa fa-times"></i></button>
										</label>
									</draggable>
									<!-- END CheckBoxis -->
									<div class="check_list_add_form_wrp">
										<div class="check_list_add_form__label" v-if="item.checkListFormShow" @click="item.checkListFormShow = false">Добавить элемент....</div>
										<div class="check_list_add_form" v-else>
											<textarea name="name" placeholder="Добавить элемент...." v-model="checkBoxName"></textarea>
											<div class="desk__addСard_left">
												<button class="green_btn" @click="checkBoxAdd(index);">Сохранить</button> 
												<button class="close_btn" @click="item.checkListFormShow = true">
													<i aria-hidden="true" class="fa fa-times"></i>
												</button>
											</div>
										</div>
									</div>
								</div>
								<!-- Windget remove CheckLists -->
								<div class="remove_checklist_wrp">
									<button class="removeCheckList" @click="item.checkListRemoveWidgetShow = !item.checkListRemoveWidgetShow"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
									<div class="popup_widget" v-if="item.checkListRemoveWidgetShow">
										<div class="popup_widget__title">
											<h3>Удаление Чек-листа</h3>
											<button class="close_btn" @click="item.checkListRemoveWidgetShow = false"><i class="fa fa-times" aria-hidden="true"></i></button>
										</div>
										<div class="popup_widget__content">
											<div class="remove_checklist">
												<p>Удаление чек-листа необратимо и не будет возможности его вернуть.</p>
												<button class="red_btn" @click="removeCheckList(index);">Удалить чек лист</button>
											</div>
										</div>
									</div>
								</div>
								<!-- END Windget remove CheckLists -->
							</div>
						</draggable>
						<!-- END CheckLists -->
					</div>
					<!-- END Left block -->
					<!-- Right block -->
					<div class="card_popup__right">
						<div class="pupup_function">
							<h3>Функции</h3>
							<ul>
								<li>
									<button class="pupup_function_btn" @click.stop="widgetShow('сheckListWidgetShow');">
										<i class="fa fa-check-square-o" aria-hidden="true"></i>
										Чек лист
									</button>
									<!-- Widget -->
									<div class="popup_widget" v-if="сheckListWidgetShow" @click.stop>
										<div class="popup_widget__title">
											<h3>Добавление чек-листа</h3>
											<button class="close_btn" @click="widgetHide('сheckListWidgetShow');"><i class="fa fa-times" aria-hidden="true"></i></button>
										</div>
										<div class="popup_widget__content">
											<div class="add_checklist">
												<label for="name_checklist">Название</label>
												<input type="text" name="name" id="name_checklist" v-model="checkListName">
												<button class="green_btn" @click.stop="addCheckList">Добавить</button>
											</div>
										</div>
									</div>
									<!-- END Widget -->
								</li>
								<li>
									<button class="pupup_function_btn" @click.stop="widgetShow('removeCardWidgetToggleShow');">
										<i class="fa fa-trash-o" aria-hidden="true"></i>
										Удалить карточку
									</button>
									<!-- Widget -->
									<div class="popup_widget" v-if="removeCardWidgetToggleShow" @click.stop>
										<div class="popup_widget__title">
											<h3>Удаление карточки</h3>
											<button class="close_btn" @click="widgetHide('removeCardWidgetToggleShow');"><i class="fa fa-times" aria-hidden="true"></i></button>
										</div>
										<div class="popup_widget__content">
											<div class="remove_checklist">
												<p>Удаление карточки необратимо и не будет возможности её вернуть.</p>
												<button class="red_btn" @click="removeCard">Удалить карточку</button>
											</div>
										</div>
									</div>
									<!-- END Widget -->
								</li>
							</ul>
						</div>
					</div>
					<!-- END Right block -->
				</div>
			</div>
		</div>
		<!-- END Popup -->
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
	components: {
		draggable: draggable
	},
	data: function() {
		return {
			addDeskBoolean: true,
			addDeskValue: '',
			addDeskText: 'Добавить список',
			desks: [], // Main array
			desksMenuBoolean: [],
			addCardsBoolean: [],
			addCardValue: '',
			removeCardWidgetToggleShow: false,
			toggleShowPupup: false,
			pupupName: '',
			popupDescription: '',
			popupDescriptionToggleShow: false,
			pupupDescritpionBtnClose: false,
			currentDeskIndex: '',
			сheckListWidgetShow: false,
			checkListName: 'Чек-лист',
			checkBoxName: '',
		}
	},
	created: function() {
		for(let i = 0; i < this.desks.length; i++) {
			this.desksMenuBoolean.push(false);
			this.addCardsBoolean.push(false);
		}
	},
	methods: {
		mainHideElements: function() {
			this.deskMenuHide(); 
			this.addCardsHide();
		},
		popupClickHideElements: function() {
			// Windgets
			this.removeCardWidgetToggleShow = false;
			this.сheckListWidgetShow = false;
		},
		addDesk: function() {
			if( this.addDeskValue.length ) {
				this.desks.push('');
				this.$set(this.desks, this.desks.length-1, {name: this.addDeskValue});
				this.addDeskValue = '';
				this.addDeskText = 'Добавьте еще одну колонку';
			}
		},
		setNameDesk: function(index) {
			this.desks[index].name = this.desks[index].name;
		},
		removeDesk: function(index) {
			this.$delete(this.desks, index);
			this.deskMenuHide(); 
		},
		deskMenuHide: function(index) {
			for(let i = 0; i < this.desksMenuBoolean.length; i++) {
				if( index !== i ) this.$set(this.desksMenuBoolean, i, false);
			}
		},
		desksMenuToggleShow: function(index) {
			this.deskMenuHide(index);
			this.$set(this.desksMenuBoolean, index, !this.desksMenuBoolean[index]);
		},
		addCardsHide: function() {
			for(let i = 0; i < this.addCardsBoolean.length; i++) {
				this.$set(this.addCardsBoolean, i, false);
			}
		},
		addCardsToggleShow: function(index) {
			this.deskMenuHide();
			this.addCardsHide();
			this.$set(this.addCardsBoolean, index, true);
		},
		addCard: function(index) {
			if( this.addCardValue.length ) {
				if(!this.desks[index].cards) this.desks[index].cards = [];
				this.desks[index].cards.length += 1;
				this.$set(this.desks[index].cards, this.desks[index].cards.length - 1, {cardName: this.addCardValue});
				this.addCardValue = '';
			}
		},
		removeCard: function() {
			this.$delete(this.desks[this.currentDeskIndex].cards, this.currentCardIndex);
			this.toggleShowPupup = false;
		},
		infoToPopup: function(obj, index, cardIndex) {
			// Name
			this.toggleShowPupup = true;
			this.pupupName = obj.cardName;
			// Description
			let description = this.desks[index].cards[cardIndex].description;
			if( description ) {
				this.popupDescription = description;
				this.popupDescriptionToggleShow = true;
				this.pupupDescritpionBtnClose = true;
			} else {
				this.popupDescription = '';
				this.popupDescriptionToggleShow = false;
			}
			//  Indexes
			this.currentDeskIndex = index;
			this.currentCardIndex = cardIndex;
		},
		cardEditName: function() {
			this.desks[this.currentDeskIndex].cards[this.currentCardIndex].cardName = this.pupupName;
		},
		description: function() {
			this.popupDescriptionToggleShow = false;
			this.pupupDescritpionBtnClose = true;
		},
		saveDescription: function() {
			if( this.popupDescription.length ) {
				let el = this.desks[this.currentDeskIndex].cards[this.currentCardIndex];
				el.description = this.popupDescription;
				this.popupDescriptionToggleShow = true;
			}
		},
		widgetShow: function(el) {
			this.popupClickHideElements();
			this[el] = !this[el];
		},
		widgetHide: function(el) {
			this[el] = false;
		},
		addCheckList: function() {
			// Close widget
			this.widgetHide('сheckListWidgetShow');
			// Push checklists
			let el = this.desks[this.currentDeskIndex].cards[this.currentCardIndex].checkLists;
			if( el ) {
				el.push(
					{
						name: this.checkListName, 
						checkListFormShow: true,
						checkListRemoveWidgetShow: false
					}
				);
			} else {
				this.desks[this.currentDeskIndex].cards[this.currentCardIndex].checkLists = [];
				this.desks[this.currentDeskIndex].cards[this.currentCardIndex].checkLists.push(
					{
						name: this.checkListName, 
						checkListFormShow: true,
						checkListRemoveWidgetShow: false
					}
				);
			}
			// Reset value
			this.checkListName = 'Чек-лист';
		},
		removeCheckList: function(index) {
			this.$delete(this.desks[this.currentDeskIndex].cards[this.currentCardIndex].checkLists, index);
		},
		checkBoxAdd: function(index) {
			if( this.checkBoxName.length ) {
				let el = this.desks[this.currentDeskIndex].cards[this.currentCardIndex].checkLists[index];
				if( !el.checkBoxis ) {
					el.checkBoxis = [];
				}
				el.checkBoxis.push({name: this.checkBoxName});
				// Reset value
				this.checkBoxName = '';
			}
		},
		checkBoxRemove: function(index, childIndex) {
			this.$delete(this.desks[this.currentDeskIndex].cards[this.currentCardIndex].checkLists[index].checkBoxis, childIndex);
		}
	}
}
</script>

<style lang="sass">
@import '/sass/reset'

.dragArea
	min-height: 10px

.wrp_checkboxis
	cursor: pointer
	display: flex
	align-items: center
	width: 100%
	padding: 6px 0
	margin-bottom: 8px
	padding-left: 4px
	border-radius: 3px
	position: relative
	&:hover
		background: #E2E4E6
	.checkbox
		display: none
		&:checked + .wrp_custom_checkbox .checkbox_custom
			background: transparent
		&:checked + .wrp_custom_checkbox .checkbox_custom:before
			content: '\f00c'
			display: block
			font-family: FontAwesome
			width: 100%
			height: 100%
			text-align: center
			line-height: 20px
			font-size: 14px
			color: #A0A1A1
		&:checked + .wrp_custom_checkbox .checkbox_name
			color: #8c8c8c
			text-decoration: line-through
			font-style: italic
	.remove_checkbox
		position: absolute
		right: 4px
		top: 50%
		transform: translateY(-50%)
		font-size: 13px !important

.wrp_custom_checkbox
	display: flex
	align-items: center
	.checkbox_custom
		display: inline-block
		width: 20px
		height: 20px
		border: 1px solid #d6dadc
		border-radius: 3px
		background: #fff
		box-shadow: 0 2px 3px rgba(0,0,0,.1)
		margin-right: 16px
	.checkbox_name
		font-size: 14px
		color: #333

.remove_checklist_wrp
	position: absolute
	right: 0
	top: 0
	i
		margin-right: 0 !important

.remove_checklist
	p
		font-size: 14px
		line-height: 16px
		color: #333
		margin-bottom: 16px

.check_list
	flex-grow: 1

.check_list_add_form__label
	cursor: pointer
	font-size: 14px
	color: #8c8c8c
	width: 100%
	height: 30px

.check_list_add_form
	textarea
		box-sizing: border-box
		border: none
		outline: none
		width: 100% !important
		height: 40px
		padding: 6px 8px
		border-radius: 3px
		background: transparent
		color: #444
		border: 1px solid #298fca
		box-shadow: 0 0 2px #298fca
		margin-bottom: 8px !important

.add_checklist
	label
		display: block
		font-weight: bold
		font-size: 12px
		color: #8c8c8c
		margin-bottom: 5px
	input
		border: none
		outline: none
		width: 100%
		padding: 6px 8px
		border-radius: 3px
		background: #E2E4E6
		border: 1px solid #cdd2d4
		font-size: 14px
		transition: all .15s ease
		margin-bottom: 20px
		&:focus
			background: #fff
			border-color: #298fca
			box-shadow: 0 0 2px #298fca

.green_btn,
.red_btn
	background: #5AAC44
	color: #fff
	box-shadow: 0 1px 0 #519839
	padding: 6px 16px
	border-radius: 3px
	font-size: 14px
	font-weight: bold
	transition: all .25s ease
	margin-right: 5px
	&:hover
		background: #519839

.red_btn
	box-shadow: none
	width: 100%
	text-align: center
	background: #EB5A46
	&:hover
		background: #cf513d

.popup_widget
	display: block
	width: 304px
	background: #FFFFFF
	position: absolute
	top: 36px
	left: 0
	border-radius: 3px 
	box-shadow: 0 1px 6px rgba(0,0,0,.15)
	padding-bottom: 12px
	z-index: 9
	&__title
		h3
			display: block
			text-align: center
			margin: 0 13px
			font-size: 15px
			height: 40px
			line-height: 40px
			color: #8c8c8c
			border-bottom: 1px solid #d6dadc
			margin-bottom: 8px
			text-transform: normal
	&__content
		padding: 8px 13px
	.close_btn
		position: absolute
		right: 13px
		top: 0

.pupup_function
	&>h3
		font-size: 12px
		text-transform: uppercase
		letter-spacing: 1.5px
		color: #8c8c8c
	ul
		li
			position: relative
			margin-top: 8px
			.pupup_function_btn
				display: flex
				align-items: center
				width: 168px
				padding: 6px 8px
				border-radius: 3px 
				box-shadow: 0 1px 0 0 #c4c9cc
				background: #E2E4E6
				font-size: 14px
				color: #444
				font-weight: bold
				&:hover
					background: #cdd2d4
					box-shadow: 0 1px 0 0 #a5acb0
				i
					color: #999
					margin-right: 8px
					font-size: 12px

.card_popup__flexWrp
	display: flex

.h3
	font-weight: bold
	font-size: 16px
	margin-bottom: 12px
	color: #333

.add_description
	font-size: 0
	flex-grow: 1
	textarea
		outline: none
		border: none
		resize: none
		box-sizing: border-box
		width: 100%
		height: 90px
		padding: 6px 8px
		background: rgba(0, 0, 0, 0.03)
		border-radius: 3px
		border: 1px solid #cdd2d4
		box-shadow: inset 0 1px 6px rgba(0,0,0,.1)
		font-size: 14px
		margin-bottom: 8px
	.description
		cursor: pointer
		font-weight: normal
		font-size: 14px
		word-break: break-all
		max-width: 521px

.card_popup
	position: absolute
	width: 100%
	min-height: 100%
	top: 0
	right: 0
	bottom: 0
	left: 0
	overflow-y: scroll
	&__mask
		position: fixed
		width: 100%
		height: 100%
		top: 0
		right: 0
		bottom: 0
		left: 0
		background-color: rgba(0,0,0,.7)
	&__content
		width: 768px
		min-height: 600px
		position: relative
		z-index: 9
		margin: 60px auto
		background-color: #EDEFF0
		border-radius: 3px
		padding: 20px 16px
	&__close
		position: absolute
		right: 16px
		top: 20px
		font-size: 25px
		color: #999
		z-index: 99
	&__item
		display: flex
		flex-wrap: wrap
		align-items: center
		margin-bottom: 35px
		position: relative
		i
			font-size: 16px
			color: #999
			margin-right: 15px
		.input_title
			padding-left: 0 !important
			flex-grow: 1
			margin-right: 25px
	&__left
		width: 552px
		margin-right: 16px
		i
			align-self: flex-start

#app
	min-height: 100vh
	background-image: url('img/bg.jpg')
	background-size: cover
	background-position: center
	overflow-y: hidden

.close_btn
	width: 30px
	height: 40px
	text-align: center
	font-size: 14px
	text-transform: uppercase
	color: #999
	&:hover
		color: #4d4d4d

.desks,
.desks__inner
	display: flex
	padding-top: 94px
	& > *
		align-self: flex-start
		margin-right: 8px

.desks__inner
	padding-top: 0
	margin-left: 8px

.desk
	width: 272px
	border-radius: 3px
	background: #e2e4e6
	position: relative
	&__menu
		display: block
		width: 306px
		background: #FFFFFF
		position: absolute
		top: 38px
		right: 38px
		transform: translateX(100%)
		border-radius: 3px 
		box-shadow: 0 1px 6px rgba(0,0,0,.15)
		padding-bottom: 12px
		z-index: 9
		h3
			display: block
			text-align: center
			margin: 0 13px
			font-size: 15px
			height: 40px
			line-height: 40px
			color: #8c8c8c
			border-bottom: 1px solid #d6dadc
			margin-bottom: 8px
		.close_btn
			position: absolute
			right: 13px
			top: 0
		ul
			li
				button
					font-weight: bold
					font-size: 14px
					text-align: left
					letter-spacing: 1px
					width: 100%
					padding: 6px 12px
					transition: all .25s ease
					&:hover
						background: #298fca
						color: #fff
	&__top
		margin: 4px 8px
		font-size: 0
		position: relative
		.btn_desk_menu
			position: absolute
			width: 30px
			height: 30px
			right: 0
			top: 0
			text-align: center
			border-radius: 3px
			transition: all .25s ease
			&:hover
				background: #cdd2d4
				span
					background: #000
			span
				display: inline-block
				width: 4px
				height: 4px
				border-radius: 50%
				background: #9A9A9A
				position: relative
				transition: all .25s ease
				&:before
					content: ''
					display: block
					width: 4px
					height: 4px
					background: inherit
					border-radius: 50%
					position: absolute
					left: -6px
				&:after
					content: ''
					display: block
					width: 4px
					height: 4px
					background: inherit
					border-radius: 50%
					position: absolute
					right: -6px
	&__addСard
		font-size: 0
		margin: 0 8px 8px 8px
		textarea
			border: none
			outline: none
			resize: none
			box-sizing: border-box
			padding: 6px 8px
			width: 100%
			height: 72px
			border-radius: 3px
			box-shadow: 0 1px 0 #ccc
			margin-bottom: 8px
			font-size: 14px
		&_left
			display: flex
			align-items: center
			.btn_addCard
				background: #5AAC44
				color: #fff
				box-shadow: 0 1px 0 #519839
				padding: 6px 16px
				border-radius: 3px
				font-size: 14px
				font-weight: bold
				transition: all .25s ease
				margin-right: 5px
				&:hover
					background: #519839
			.close_btn
				height: 28px

.desk__btnAddСard
	width: 100%
	border-radius: 0 0 3px 3px
	padding: 8px 10px
	text-align: left
	display: flex
	align-items: center
	&:hover
		background-color: #cdd2d4
		span
			text-decoration: underline
			color: #444
		i
			color: #444
	i
		font-size: 18px
		font-style: normal
		font-weight: bold
		color: #8c8c8c
		margin-right: 4px
	span
		font-size: 14px
		color: #8c8c8c

.add_desk
	text-align: left
	width: 100%
	height: 34px
	padding: 7px
	color: hsla(0,0%,100%,.7)
	font-size: 14px
	letter-spacing: 2px
	background: rgba(0,0,0,.12)
	border-radius: 3px
	transition: all .10s ease-in-out
	i
		font-style: normail
		font-size: 18px
	&:hover
		background: rgba(0,0,0,.3)

.wrp_add_desk
	min-width: 264px
	.desk__addСard
		background-color: #E2E4E6
		border-radius: 3px

#app
	.input_title
		outline: none
		resize: none
		border: none
		background: none
		box-sizing: border-box
		border: 1px solid transparent
		width: 225px
		height: 30px
		font-weight: bold
		font-size: 16px
		word-break: break-all
		padding: 4px 8px
		cursor: pointer
		&:focus
			cursor: text
			background: #fff
			border: 1px solid #0079bf
			box-shadow: 0 0 2px 0 #0284c6

#app
	.wrp_add_desk
		position: relative
		.input_title
			width: 100%
			margin-bottom: 4px
		.desk__addСard
			padding: 4px
			position: absolute
			right: 0
			top: 0
			left: 0

.card
	cursor: pointer
	background: #fff
	border-radius: 3px
	padding: 6px 8px
	margin: 8px 8px 8px 8px
	box-shadow: 0 1px 0 #ccc
	&:hover
		background: #EDEFF0
	span
		color: #444
		font-size: 14px
		word-break: break-all
</style>
