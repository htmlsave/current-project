<template>
  <div id="app" @click="deskMenuHide(); addCardsHide();">
   	<!-- Desks -->
		<div class="desks">
			
			<!-- desk -->
			<draggable class="desks__inner">
				<div class="desk" v-for="(item, index) in desks">
					<!-- Menu with top-->
					<div class="desk__top">
						<textarea name="name" class="input_title" :value="item.name"></textarea>
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
						<draggable>
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
		<div class="card_popup" v-if="toggleShowPupup">
			<div class="card_popup__mask" @click="toggleShowPupup = false"></div>
			<div class="card_popup__content">

				<button class="card_popup__close" @click="toggleShowPupup = false"><i class="fa fa-times"></i></button>

				<div class="card_popup__item">
					<i class="fa fa-columns" aria-hidden="true"></i>
					<textarea name="name" class="input_title" :value="pupupName"></textarea>
				</div>

				<div class="card_popup__flexWrp">
					<!-- Left block -->
					<div class="card_popup__left">
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

						<div class="card_popup__left">
							<div class="card_popup__item" v-for="items in checkListPrint">
								<i class="fa fa-check-square-o" aria-hidden="true"></i>
								<div class="check_list">
									<h3 class="h3">{{ items.name }}</h3>

									<div class="check_list_add_form_wrp">
										<div class="check_list_add_form__label" v-if="checkListFormShow" @click="checkListFormShow = false">Добавить элемент....</div>
										<div class="check_list_add_form" v-else>
											<textarea name="name" placeholder="Добавить элемент...."></textarea>
											<div class="desk__addСard_left">
												<button class="green_btn">Сохранить</button> 
												<button class="close_btn" @click="checkListFormShow = true">
													<i aria-hidden="true" class="fa fa-times"></i>
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- END Left block -->
					<!-- Right block -->
					<div class="card_popup__right">
						<div class="pupup_function">
							<h3>Функции</h3>
							<ul>
								<li>
									<button class="pupup_function_btn" @click="widgetShow('сheckListWidgetShow');">
										<i class="fa fa-check-square-o" aria-hidden="true"></i>
										Чек лист
									</button>
									<div class="popup_widget" v-if="сheckListWidgetShow">
										<div class="popup_widget__title">
											<h3>Добавление чек-листа</h3>
											<button class="close_btn" @click="widgetHide('сheckListWidgetShow');"><i class="fa fa-times" aria-hidden="true"></i></button>
										</div>
										<div class="popup_widget__content">
											<div class="add_checklist">
												<label for="name_checklist">Название</label>
												<input type="text" name="name" id="name_checklist" v-model="checkListName">
												<button class="green_btn" @click="addCheckList">Добавить</button>
											</div>
										</div>
									</div>
								</li>
								<li>
									<button class="pupup_function_btn" @click="removeCard">
										<i class="fa fa-trash-o" aria-hidden="true"></i>
										Удалить карточку
									</button>
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
			desks: [
				{
					name: 'Desk #1',
					cards: [
						{
							cardName: "test"
						},
						{
							cardName: "test 2"
						}
					]
				}
			],
			desksMenuBoolean: [],
			addCardsBoolean: [],
			addCardValue: '',
			toggleShowPupup: false,
			pupupName: '',
			popupDescription: '',
			popupDescriptionToggleShow: false,
			pupupDescritpionBtnClose: false,
			currentDeskIndex: '',
			currentCardIndex: '',
			сheckListWidgetShow: false,
			checkListName: 'Чек-лист',
			checkListPrint: [],
			checkListFormShow: true
		}
	},
	created: function() {
		for(let i = 0; i < this.desks.length; i++) {
			this.desksMenuBoolean.push(false);
			this.addCardsBoolean.push(false);
		}
	},
	methods: {
		addDesk: function() {
			if( this.addDeskValue.length ) {
				this.desks.push('');
				this.$set(this.desks, this.desks.length-1, {name: this.addDeskValue});
				this.addDeskValue = '';
				this.addDeskText = 'Добавьте еще одну колонку';
			}
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
			// CheckLists
			let checkLists = this.desks[index].cards[cardIndex].checkLists;
			if( checkLists ) {
				this.checkListPrint = checkLists;
			} else {
				this.checkListPrint = [];
			}
			console.log(this.checkListPrint);
			//  Indexes
			this.currentDeskIndex = index;
			this.currentCardIndex = cardIndex;
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
				el.push({name: this.checkListName});
				// Print to loyout
				this.checkListPrint.push({name: this.checkListName});
			} else {
				this.desks[this.currentDeskIndex].cards[this.currentCardIndex].checkLists = [];
				this.desks[this.currentDeskIndex].cards[this.currentCardIndex].checkLists.push({name: this.checkListName});
				// Print to loyout
				this.checkListPrint.push({name: this.checkListName})
			}
			// Reset value
			this.checkListName = 'Чек-лист';
		}
	}
}
</script>

<style lang="sass">
@import '/sass/reset'

.check_list
	flex-grow: 1
	margin-bottom: 35px

.check_list_add_form__label
	cursor: pointer
	font-size: 14px
	color: #8c8c8c
	width: 100%
	height: 30px

.check_list_add_form
	textarea
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

.green_btn
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
	&__item
		display: flex
		flex-wrap: wrap
		align-items: center
		margin-bottom: 35px
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
		&:first-child
			margin-left: 8px

.desks__inner
	padding-top: 0

.desk
	min-width: 272px
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
</style>
