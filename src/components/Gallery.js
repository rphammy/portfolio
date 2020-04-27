import React, { Component } from 'react';
import ScrollToTop from './ScrollToTop'
import kelsey from '../images/kelsey.png'
import phamily from '../images/phamily.png'
import lucas from '../images/lucas.png'
import brooke from '../images/brooke.png'
import pride from '../images/sd_pride.png'
import bagel from '../images/bagel.png'
import marina from '../images/marina.png'
import laxJump from '../images/lax_jump.png'
import cousins from '../images/cousins.png'
import laxArizona from '../images/lax_arizona.png'
import laxBanquet from '../images/lax_banquet.png'

export class Gallery extends Component {
	render() {
		return(
			<div>
				<div class="header">
					<h1>Gallery</h1>
				</div>

				<section class="gallery">
					<a href="#kelsey">
						<img src={kelsey} width="400" height="300"/>
					</a>
					<a href="#phamily">
						<img src={phamily} width="400" height="300"/>
					</a>
					<a href="#lucas">
						<img src={lucas} width="300" height="400"/>
					</a>
					<a href="#brooke">
						<img src={brooke} width="300" height="400"/>
					</a>
					<a href="#sd">
						<img src={pride} width="400" height="300"/>
					</a>

					<a href="#bagel">
						<img src={bagel} width="300" height="400"/>
					</a>
					<a href="#marina">
						<img src={marina} width="425" height="300"/>		
					</a>
					<a href="#lax_jump">
						<img src={laxJump} width="300" height="400"/>
					</a>
					<a href="#cousins">
						<img src={cousins} width="400" height="300"/>
					</a>
					<a href="#lax_arizona">
						<img src={laxArizona} width="400" height="300"/>
					</a>
					<a href="#lax_banquet">
						<img src={laxBanquet} width="475" height="300"/>
					</a>
				</section>

				<a href="#" class="lightbox" id="kelsey">
				  <img src={kelsey}/>
				</a>
				<a href="#" class="lightbox" id="phamily">
				  <img src={phamily}/>
				</a>
				<a href="#" class="lightbox" id="lucas">
				  <img src={lucas}/>
				</a>
				<a href="#" class="lightbox" id="brooke">
				  <img src={brooke}/>
				</a>
				<a href="#" class="lightbox" id="sd">
				  <img src={pride}/>
				</a>
				<a href="#" class="lightbox" id="bagel">
				  <img src={bagel}/>
				</a>
				<a href="#" class="lightbox" id="marina">
				  <img src={marina}/>
				</a>
				<a href="#" class="lightbox" id="lax_jump">
				  <img src={laxJump}/>
				</a>
				<a href="#" class="lightbox" id="cousins">
				  <img src={cousins}/>
				</a>
				<a href="#" class="lightbox" id="lax_arizona">
				  <img src={laxArizona}/>
				</a>
				<a href="#" class="lightbox" id="lax_banquet">
				  <img src={laxBanquet}/>
				</a>

				<ScrollToTop/>
			</div>

		);
	}
}

export default Gallery;