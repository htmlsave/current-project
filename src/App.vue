<template>
  <div id="app" @click="deskMenuHide">
   
		<div class="desks">

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
					<button class="close_btn" @click="deskMenuHide">х</button>
					<ul>
						<li><button>Добавить карточку...</button></li>
						<li><button @click="removeDesk(index);">Удалить Список...</button></li>
					</ul>
				</div>
				<!-- END Menu with top-->

				<!-- Add card -->
				<div class="desk__addСard" v-if="addCardsBoolean[index]">
					<textarea name="name" placeholder="Введите заголовок для этой карточки"></textarea>
					<div class="desk__addСard_bottom">
						<div class="desk__addСard_left">
							<button class="btn_addCard">Добавить карточку</button>
							<button class="close_btn" @click="$set(addCardsBoolean, index, false);">x</button>
						</div>
						<div class="desk__addСard_right"></div>
					</div>
				</div>
				<button class="desk__btnAddСard" v-else @click="$set(addCardsBoolean, index, true);">
					<i>+</i> 
					<span>Добавить карточку</span>
				</button>
				<!-- END Add card -->
			</div>

			<!-- Add desk -->
			<div class="wrp_add_desk">
				<button class="add_desk" v-if="addDeskBoolean" @click="addDeskBoolean = !addDeskBoolean">
					<i>+</i> 
					<span>{{ addDeskText }}</span>
				</button>
				<div class="desk__addСard" v-else>
					<textarea name="name" class="input_title" placeholder="Введите заголовок списка" v-model="addDeskValue"></textarea>
					<div class="desk__addСard_bottom">
						<div class="desk__addСard_left">
							<button class="btn_addCard" @click="addDesk">Добавить карточку</button>
							<button class="close_btn" @click="addDeskBoolean = !addDeskBoolean">x</button>
						</div>
						<div class="desk__addСard_right"></div>
					</div>
				</div>
			</div>
			<!-- END Add desk -->

		</div>

  </div>
</template>

<script>
export default {
	data: function() {
		return {
			addDeskText: 'Добавить список',
			addDeskBoolean: true,
			addDeskValue: '',
			desks: [],
			desksMenuBoolean: [],
			addCardsBoolean: []
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
				this.desks.push({});
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
		}
	}
}
</script>

<style lang="sass">
@import '/sass/reset'

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

.desks
	display: flex
	padding-top: 94px
	& > *
		align-self: flex-start
		margin-right: 8px
		&:first-child
			margin-left: 8px

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
</style>
